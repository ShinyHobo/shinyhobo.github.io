import _ from 'lodash';
import { LazyHttpDatabase} from "sql.js-httpvfs/dist/sqlite.worker";
import * as Comlink from "comlink";

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
    public static async getUniqueDeliverables(db: Database, addedDate: string, limit: number, offset: number) {
        // Get all deliverables, grouping by uuid and ordering by add date, to get the most recent additions only
        const dbDeliverableIds = (await db?.query(`SELECT id, title, MAX(addedDate) as max FROM deliverable_diff WHERE addedDate <= ${addedDate} 
            GROUP BY uuid ORDER BY title ASC LIMIT ${limit} offset ${offset}`) as any[]).map(d => d.id);

        let dbDeliverables = await db?.query(`SELECT * FROM deliverable_diff WHERE id IN (${dbDeliverableIds.toString()})`) as any[];

        // Get complete list of deliverables that have names already, filtering out everything by the most recent addition of the item (some older entries are the same item with a different slug)
        const deduplicatedAnnouncedDeliverables = _.chain(dbDeliverables.filter(d => d.title && !d.title.includes("Unannounced"))).groupBy('title').map((d: any[]) => d[0]).value();

        // Get list of unannounced deliverables
        const deduplicatedUnannouncedDeliverables = dbDeliverables.filter(d => d.title && d.title.includes("Unannounced"));
        dbDeliverables = [...deduplicatedAnnouncedDeliverables, ...deduplicatedUnannouncedDeliverables];

        // Get list of deliverables that have been removed (denoted by missing end/start dates); these are included in the initial query to retrieve the most up to date versions
        const removedDeliverables = dbDeliverables.filter(d => d.startDate === null && d.endDate === null);
        dbDeliverables = dbDeliverables.filter(d => !removedDeliverables.some(r => r.uuid === d.uuid || (r.title && r.title === d.title && !r.title.includes("Unannounced"))));

        // Sort deliverables by announced (combining items with the same name)
        const announcedDeliverables = _.chain(dbDeliverables.filter(d => d.title && !d.title.includes("Unannounced"))).groupBy('title').map(d => d[0]).value();
        // and unannounced (all have the same name)
        const unAnnouncedDeliverables = dbDeliverables.filter(d => d.title && d.title.includes("Unannounced"));

        dbDeliverables = [...announcedDeliverables, ...unAnnouncedDeliverables];
        
        return dbDeliverables;
    }

    /**
     * Builds the complete deliverable object (sub-componets like teamtimes included) array of all deliverables for the desired time
     * @param db The database connection
     * @param date The delta timestamp to use
     * @param limit The number of deliverables to build
     * @param offset The number of deliverables to skip
     * @param alphabetize Whether or not to alphabetize sort the list (default no)
     * @returns The array of built deliverables
     */
    public static async buildCompleteDeliverables(db: Database, date: string, limit: number = 0, offset: number = 0, alphabetize: boolean = false) {
        const dbDeliverables = await this.getUniqueDeliverables(db, date, limit, offset);
        const cardIds: string = dbDeliverables.filter((dd) => dd.card_id).map((dd) => dd.card_id).toString();
        const dbCards: any[] = await db?.query(`SELECT * FROM card_diff WHERE id IN (${cardIds})`) as any[];
        const deliverableIds = dbDeliverables.map((dd) => dd.id).toString();

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

        dbDeliverables.forEach((d) => {
            d.card = dbCards.find((c) => c.id === d.card_id);
            const timeAllocations = _.groupBy(dbTimeAllocationsGrouped[d.id], 'team_id');
            const teams = dbDeliverableTeams.filter(t => deliverableTeams[d.id] && deliverableTeams[d.id].some(tid => t.id === tid.team_id));
            teams.forEach((t) => {
                if(!d.teams) {
                    d.teams = [];
                }
                let team = _.clone(t);
                team.timeAllocations = timeAllocations[t.id] && timeAllocations[t.id].filter(z => z.startDate && z.endDate);
                d.teams.push(team);
            });
        });
        return alphabetize ? _.orderBy(dbDeliverables, [d => d.title.toLowerCase()], ['asc']) : dbDeliverables;
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
}