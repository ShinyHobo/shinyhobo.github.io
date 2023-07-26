import _ from 'lodash';
import { LazyHttpDatabase} from "sql.js-httpvfs/dist/sqlite.worker";
import * as Comlink from "comlink";
import * as he from 'he';

// The sqlite stats, tracks all requests from initialization
export type SqliteStats = {
    filename: string;
    totalBytes: number;
    totalFetchedBytes: number;
    totalRequests: number;
    rowsReturned?: number;
};

export type Database = Comlink.Remote<LazyHttpDatabase> | null;

// Common database functions
export class CommonDBFunctions {
    /**
     * Gets the list of available delta datetimes (optimized)
     * @param db The database connection
     * @returns A list of epoch timestamps in seconds representing each delta's addition to the database
     */
    public static async getDeltaList(db: Database): Promise<string[]> {
        const result: any[] = await db?.query("SELECT GROUP_CONCAT(addedDate) FROM (SELECT DISTINCT addedDate FROM deliverable_diff ORDER BY addedDate DESC)") as any[];
        const dateList: string[] = _.split(result[0]['GROUP_CONCAT(addedDate)'], ",");
        return dateList;
    }

    /**
     * Gets the closest prior delta addition timestamp (optimized)
     * @param db The database connection
     * @param date The epoch timestamp to find the closest matching delta addition prior to the value
     * @returns The closest matching timestamp value
     */
    public static async getClosestDeltaDate(db: Database, date: string): Promise<string> {
        const result: any[] = await db?.query(`SELECT addedDate FROM deliverable_diff WHERE addedDate <= ${date} ORDER BY addedDate DESC LIMIT 1`) as any[];
        return result[0].addedDate;
    }

    /**
     * Retrieves the list of unique deliverables for the given timestamp (optimized)
     * @param db The database connection
     * @param addedDate The delta datetime to lookup
     * @param limit The number of deliverables to get
     * @param offset The number of deliverables to skip
     * @returns The list of unique, listed deliverables on the progress tracker
     */
    public static async getUniqueDeliverables(db: Database, addedDate: string, limit: number = 0, offset: number = 0) {
        // Get all deliverables, grouping by uuid and ordering by add date, to get the most recent additions only
        //const dbDeliverableIds = (await db?.query(`SELECT id, MAX(addedDate) as max FROM deliverable_diff WHERE addedDate <= ${addedDate} 
        //    GROUP BY uuid ORDER BY addedDate ASC`) as any[]).map(d => d.id);

        const dbDeliverableIdsResult = await db?.query(`SELECT sampleDate, deliverable_ids FROM sample_date_deliverables_cache WHERE sampleDate = ${addedDate}`);
        const dbDeliverableIds = dbDeliverableIdsResult?.map((r:any) => r.deliverable_ids)[0].split(",");

        let dbDeliverables = await db?.query(`SELECT * FROM deliverable_diff WHERE id IN (${dbDeliverableIds.toString()})`) as any[];
        dbDeliverables = _.orderBy(dbDeliverables, [d => he.unescape(d.title).toLowerCase()], ['asc']);

        // Get complete list of deliverables that have names already, filtering out everything by the most recent addition of the item (some older entries are the same item with a different slug)
        const deduplicatedAnnouncedDeliverables = _.chain(dbDeliverables.filter(d => he.unescape(d.title) && !d.title.includes("Unannounced"))).groupBy(x => he.unescape(x.title)).map((d: any[]) => d[d.length-1]).value();

        // Get list of unannounced deliverables
        const deduplicatedUnannouncedDeliverables = dbDeliverables.filter(d => he.unescape(d.title) && d.title.includes("Unannounced"));
        dbDeliverables = [...deduplicatedAnnouncedDeliverables, ...deduplicatedUnannouncedDeliverables];

        // Get list of deliverables that have been removed (denoted by missing end/start dates); these are included in the initial query to retrieve the most up to date versions
        const removedDeliverables = dbDeliverables.filter(d => d.startDate === null && d.endDate === null);
        dbDeliverables = dbDeliverables.filter(d => !removedDeliverables.some(r => r.uuid === d.uuid || (r.title && he.unescape(r.title) === he.unescape(d.title) && !r.title.includes("Unannounced"))));

        // Sort deliverables by announced (combining items with the same name)
        const announcedDeliverables = _.chain(dbDeliverables.filter(d => he.unescape(d.title) && !d.title.includes("Unannounced"))).groupBy('title').map(d => d[0]).value();
        // and unannounced (all have the same name)
        const unAnnouncedDeliverables = dbDeliverables.filter(d => he.unescape(d.title) && d.title.includes("Unannounced"));

        dbDeliverables = [...announcedDeliverables, ...unAnnouncedDeliverables];

        let returnDeliverables = _(dbDeliverables);
        if(offset) {
            returnDeliverables = returnDeliverables.drop(offset);
        }
        if(limit) {
            returnDeliverables = returnDeliverables.take(limit);
        }

        return returnDeliverables.value();
    }
    
    private static lookAheadTime: number = 86400000 * 14; // 14 days, bi-weekly updates, usually

    /**
     * Gets the list of in progress deliverable ids
     * @param db The database connection
     * @param date The delta timestamp to use
     * @param deliverables The deliverables to search with
     * @returns The list of deliverable ids that have time allocations currently, or about to be, in progress
     */
    public static async getInProgressDeliverables(db: Database, date: string, deliverables: any[], checkTeamIds: string = ""): Promise<number[]> {
        let deliverableIds = deliverables.map((dd) => dd.id).toString();
        const query = `SELECT deliverable_id, team_id, MAX(max) as m FROM (SELECT DISTINCT MAX(addedDate) as max, deliverable_id, team_id from timeAllocation_diff WHERE deliverable_id IN (${deliverableIds}) AND 
            startDate <= ${parseInt(date) + CommonDBFunctions.lookAheadTime} AND ${date} <= endDate ${checkTeamIds?`AND team_id IN (${checkTeamIds}) `:""}GROUP BY uuid) GROUP BY deliverable_id ORDER BY m DESC`;
        let results = await db?.query(query);
        
        deliverableIds = results?.map((r: any) => r.deliverable_id).toString() ?? "";

        const teamCheckQuery = `SELECT id FROM (SELECT id, MAX(addedDate) FROM team_diff WHERE addedDate <= ${date} AND 
            id IN (SELECT team_id FROM deliverable_teams WHERE deliverable_id IN (${deliverableIds})) GROUP BY slug ORDER BY addedDate DESC)`;
        
        const foundTeams = await db?.query(teamCheckQuery);
        const teamIds = foundTeams?.map((ft:any)=>ft.id) as number[];
        results = results?.filter((r:any)=> teamIds.indexOf(r.team_id) > -1);

        return [...new Set(results?.map((r: any) => parseInt(r.deliverable_id)))] as number[];
    }

    /**
     * Gets in progress deliverable ids from a cache table
     * @param db The database connection
     * @param date The sample date to filter by
     * @returns The set of in progress deliverable ids
     */
    public static async getInProgressDeliverablesCache(db: Database, date: string): Promise<number[]> {
        const results = await db?.query(`SELECT sampleDate, deliverable_ids FROM in_progress_deliverables_cache WHERE sampleDate = ${date}`);
        const ids = results?.map((r:any) => r.deliverable_ids)[0].split(",");
        return [...new Set(ids?.map((r: any) => parseInt(r)))] as number[];
    }

    /**
     * Gets a list of deliverables and the teams that were assigned to them.
     * @param db The database connection
     * @param deliverables The deliverables to filter by
     * @returns The list of deliverable team composites
     */
    public static async getDeliverableTeams(db: Database, deliverables: any[]) {
        const deliverableIds = deliverables.map((dd) => dd.id).toString();
        const deliverableTeamQuery = `SELECT deliverable_id, team_id, title, abbreviation FROM deliverable_teams AS dt INNER JOIN team_diff AS td ON dt.team_id = td.id WHERE deliverable_id IN (${deliverableIds}) GROUP BY deliverable_id, title ORDER BY addedDate`;
        const deliverableTeams = await db?.query(deliverableTeamQuery) as any[];
        const ordered = _.orderBy(deliverableTeams, [(g:any)=>g.title], ['asc'])
        const group = _.groupBy(ordered, 'title');
        return Object.keys(group).map(key => ({ key, deliverables: group[key] }));
    }

    public static async getDeliverableTeamsCache(db: Database, date: string, deliverables: any[]) {
        const deliverableTeamsCacheQuery = `SELECT team_ids FROM deliverable_teams_cache WHERE sampleDate = ${date}`;
        const teamIdsResults = await db?.query(deliverableTeamsCacheQuery) as any[];
        const teamIds = teamIdsResults?.map((r:any) => r.team_ids)[0].split(",");
        return[];
    }

    /**
     * Builds the complete deliverable object (sub-componets like teamtimes included) array of all deliverables for the desired time
     * @param db The database connection
     * @param date The delta timestamp to use
     * @param deliverables The deliverables to build out
     * @returns The array of built deliverables
     */
    public static async buildCompleteDeliverables(db: Database, date: string, deliverables: any[]) {
        const cardIds: string = deliverables.filter((dd) => dd.card_id).map((dd) => dd.card_id).toString();
        const dbCards: any[] = await db?.query(`SELECT * FROM card_diff WHERE id IN (${cardIds})`) as any[];
        const deliverableIds = deliverables.map((dd) => dd.id).toString();

        const dbDeliverableTeams: any[] = await db?.query(`SELECT *, MAX(addedDate) FROM team_diff WHERE addedDate <= ${date} AND 
            id IN (SELECT team_id FROM deliverable_teams WHERE deliverable_id IN (${deliverableIds})) GROUP BY slug ORDER BY addedDate DESC`) as any[];
        const deliverableTeamIds = dbDeliverableTeams.map(dt => dt.id).toString();
        const deliverableTeams = _.groupBy(await db?.query(`SELECT * FROM deliverable_teams WHERE team_id IN (${deliverableTeamIds}) AND deliverable_id IN (${deliverableIds})`) as any[], 'deliverable_id');

        //let dbTimeAllocations = await db?.query(`SELECT * FROM timeAllocation_diff AS ta INNER JOIN discipline_diff AS di ON di.id = ta.discipline_id WHERE 
        //   deliverable_id IN (${deliverableIds}) AND team_id IN (${deliverableTeamIds})`) as any[];

        let dbTimeAllocations = await db?.query(`SELECT *, MAX(ta.addedDate) as time_added, ta.id AS time_id, ta.uuid AS time_uuid FROM timeAllocation_diff AS ta JOIN 
             discipline_diff AS di ON di.id = ta.discipline_id WHERE deliverable_id IN (${deliverableIds}) AND team_id IN (${deliverableTeamIds}) AND partialTime IS NOT NULL GROUP BY ta.uuid`) as any[];

        //let teamIds = dbTimeAllocations.map(z => z.team_id).filter((value, index, self) => self.indexOf(value) === index);

        dbTimeAllocations.forEach(ta => {
                    ta.disciplineUuid = ta.uuid;
                    ta.id = ta.time_id;
                    ta.uuid = ta.time_uuid;
                    ta.addedDate = ta.time_added;
                    delete(ta.time_id);
                    delete(ta.time_uuid);
                    delete(ta.time_added);
                });
        let dbTimeAllocationsGrouped = _.groupBy(dbTimeAllocations, 'deliverable_id');

        deliverables.forEach((d) => {
            d.card = dbCards.find((c) => c.id === d.card_id);
            const timeAllocations = _.groupBy(dbTimeAllocationsGrouped[d.id], 'team_id');
            const teams = dbDeliverableTeams.filter(t => deliverableTeams[d.id] && deliverableTeams[d.id].some(tid => t.id === tid.team_id));
            d.teams = [];
            teams.forEach((t) => {
                let team = _.clone(t);
                team.timeAllocations = timeAllocations[t.id] && timeAllocations[t.id].filter(z => z.startDate && z.endDate);
                d.teams.push(team);
            });
        });
        return deliverables;
    }

    /**
     *  Converts the bytes transfered to human readible values
     * @param bytes the bytes to convert
     * @returns the value in terms of MB or KB
     */
    public static formatBytes(bytes: number) {
        if (bytes > 1e6) {
            return (bytes / 1e6).toFixed(2) + "MB";
        }
        if (bytes > 1e3) {
            return (bytes / 1e3).toFixed(2) + "KB";
        }
        return bytes + "B";
    }

    /** RSI hostname */
    public static readonly rsi = 'robertsspaceindustries.com';

    /** The available project images */
    public static readonly ProjectImages: {[key:string]: string;} = {
        SQ42: "/media/z2vo2a613vja6r/source/Squadron42_White_Reserved_Transparent.png",
        SC: "/media/b9ka4ohfxyb1kr/source/StarCitizen_Square_LargeTrademark_White_Transparent.png"
    };

    /** The up/down stream position of a team, false is up */
    public static readonly TeamStreamPosition: {[key:string]: boolean} = {
        ACFT: true, // Arena Commander Feature Team
        AFT: false, // Actor Feature Team
        AIC: true, // AI Content Team
        AITF: true, // AI Tech and Feature Team
        ATT: true, // Actor Tech Team
        AUDIO: true, // Audio
        //CAT:, // Character Art and Tech Team
        CINE: true, // Cinematics Team
        CTA: true, // Character Tech Art
        DVT: true, // Tools Team
        EDIT: true, // Editor Team
        ENG: true, // Engine Team
        EULZ1: false, // EU Landing Zone 1
        EULZ2: false, // EU Landing Zone 2
        EULZ: false, // EU Landing Zone Team
        EUPU: false, // EU PU Gameplay Feature Team
        EUSB1: false, // EU Sandbox 1
        EUSB2: false, // EU Sandbox 2
        EUVC: false, // Vehicle Content - EU
        FACE: true, // Facial Animation
        //FS:, // Firesprite Team
        GFX: true, // Graphics Team
        GPS: false, // Gameplay Story
        GSC: false, // Game Services Team
        INTER: true, // Interactables Team
        LCA: true, // Location Concept Art
        LD1: true, // SQ42 Level Design 1 - FPS
        LD2: true, // SQ42 Level Design 2 - Flight
        LD3: true, // SQ42 Level Design 3 - Social
        LIGHT: true, // Lighting Team
        LIT: false, // Live Tools Team
        //LMC:, // Live Mission Content Team
        MFT: false, // Mission Feature Team
        MOCAP: true, // Motion Capture Team
        MTLSB: false, // MTL Sandbox 1
        MTLVC: false, // Vehicle Content - MTL
        NARR: true, // Narrative
        NET: true, // Network Team
        //PCT:, // Planet Content Team
        PHYS: true, // Physics Team
        //PROPS:, // Props Team
        PT: true, // Persistent Tech Team
        PTT: true, // Planet Tech Team
        S42A: true, // SQ42 Art
        S42CA: true, // SQ42 Character Art
        S42FT: true, // SQ42 Feature Team
        S42UI: true, // SQ42 UI Feature Team
        SCCA: true, // SC Character Art
        SST: false, // Systemic Services and Tools Team
        TAN: true, // Tech Animation Team
        //UIF:, // UI Feature Team
        UIT: true, // UI Tech Team
        USPU: false, // US PU Gameplay Feature Team
        USVC: false, // Vehicle Content - US
        VCA: true, // Vehicle Concept Art
        //VET:, // Vehicle Experience Team
        VFT: false, // Vehicle Feature Team
        VFX: true, // VFX Team
        //VTT:, // Vehicle Tech Team
        WCT: true, // Weapon Content Team
        WFT: false// Weapon Feature Team
    };
}