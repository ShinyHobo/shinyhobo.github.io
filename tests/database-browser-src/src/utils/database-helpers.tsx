import _ from "lodash";
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
     * Gets the list of available delta datetimes
     * @param db The database connection
     * @returns A list of epoch timestamps in seconds representing each delta's addition to the database
     */
    public static async getDeltaList(db: Database): Promise<string[]> {
        const result: any[] = await db?.query("SELECT GROUP_CONCAT(addedDate) FROM (SELECT DISTINCT addedDate FROM deliverable_diff ORDER BY addedDate DESC)") as any[];
        const dateList: string[] = _.split(Object.values(result[0] ?? [])[0] as string, ",");
        return dateList;
    }

    /**
     * Gets the closest prior delta addition timestamp
     * @param db The database connection
     * @param date The epoch timestamp to find the closest matching delta addition prior to the value
     * @returns The closest matching timestamp value
     */
    public static async getClosestDeltaDate(db: Database, date: string): Promise<string> {
        const result: any[] = await db?.query(`SELECT addedDate FROM deliverable_diff WHERE addedDate <= ${date} ORDER BY addedDate DESC LIMIT 1`) as any[];
        const closestDate: string = Object.values(result[0] ?? [])[0] as string;
        return closestDate;
    }

    // private static buildDeliverables(date: number, db: Database, alphabetize: boolean = false): any[] {
    //     let dbDeliverables = db.prepare(`SELECT *, MAX(addedDate) as max FROM deliverable_diff WHERE addedDate <= ${date} GROUP BY uuid ORDER BY addedDate DESC`).all();
    //     const deduplicatedAnnouncedDeliverables = _._(dbDeliverables.filter(d => d.title && !d.title.includes("Unannounced"))).groupBy('title').map(d => d[0]).value();
    //     const deduplicatedUnannouncedDeliverables = dbDeliverables.filter(d => d.title && d.title.includes("Unannounced"));
    //     dbDeliverables = [...deduplicatedAnnouncedDeliverables, ...deduplicatedUnannouncedDeliverables];
    //     let removedDeliverables = dbDeliverables.filter(d => d.startDate === null && d.endDate === null);
    //     dbDeliverables = dbDeliverables.filter(d => !removedDeliverables.some(r => r.uuid === d.uuid || (r.title && r.title === d.title && !r.title.includes("Unannounced"))));
    //     const announcedDeliverables = _._(dbDeliverables.filter(d => d.title && !d.title.includes("Unannounced"))).groupBy('title').map(d => d[0]).value();
    //     const unAnnouncedDeliverables = dbDeliverables.filter(d => d.title && d.title.includes("Unannounced"));
    //     dbDeliverables = [...announcedDeliverables, ...unAnnouncedDeliverables];

    //     const cardIds = dbDeliverables.filter((dd) => dd.card_id).map((dd) => dd.card_id).toString();
    //     const dbCards = db.prepare(`SELECT * FROM card_diff WHERE id IN (${cardIds})`).all();

    //     const deliverableIds = dbDeliverables.map((dd) => dd.id).toString();

    //     const dbDeliverableTeams = db.prepare(`SELECT *, MAX(addedDate) FROM team_diff WHERE addedDate <= ${date} AND id IN (SELECT team_id FROM deliverable_teams WHERE deliverable_id IN (${deliverableIds})) GROUP BY slug ORDER BY addedDate DESC`).all();
    //     const deliverableTeamIds = dbDeliverableTeams.map(dt => dt.id).toString()
    //     const deliverableTeams = _.groupBy(db.prepare(`SELECT * FROM deliverable_teams WHERE team_id IN (${deliverableTeamIds}) AND deliverable_id IN (${deliverableIds})`).all(), 'deliverable_id');

    //     let dbTimeAllocations = db.prepare(`SELECT *, MAX(ta.addedDate), ta.id AS time_id, ta.uuid AS time_uuid, ta.addedDate AS time_added FROM timeAllocation_diff AS ta JOIN discipline_diff AS di ON di.id = ta.discipline_id`+
    //     ` WHERE deliverable_id IN (${deliverableIds}) AND team_id IN (${dbDeliverableTeams.map(z => z.id).join(',')}) AND partialTime IS NOT NULL GROUP BY ta.uuid`).all();
    //     //let teamIds = dbTimeAllocations.map(z => z.team_id).filter((value, index, self) => self.indexOf(value) === index);
    //     dbTimeAllocations.forEach(ta => {
    //         ta.disciplineUuid = ta.uuid;
    //         ta.id = ta.time_id;
    //         ta.uuid = ta.time_uuid;
    //         ta.addedDate = ta.time_added;
    //         delete(ta.time_id);
    //         delete(ta.time_uuid);
    //         delete(ta.time_added);
    //     });
    //     dbTimeAllocations = _.groupBy(dbTimeAllocations, 'deliverable_id');

    //     dbDeliverables.forEach((d) => {
    //         d.card = dbCards.find((c) => c.id === d.card_id);
    //         const timeAllocations = _.groupBy(dbTimeAllocations[d.id], 'team_id');
    //         const teams = dbDeliverableTeams.filter(t => deliverableTeams[d.id] && deliverableTeams[d.id].some(tid => t.id === tid.team_id));
    //         teams.forEach((t) => {
    //             if(!d.teams) {
    //                 d.teams = [];
    //             }
    //             let team = _.clone(t);
    //             team.timeAllocations = timeAllocations[t.id] && timeAllocations[t.id].filter(z => z.startDate && z.endDate);
    //             d.teams.push(team);
    //         });
    //     });

    //     return alphabetize ? _.orderBy(dbDeliverables, [d => d.title.toLowerCase()], ['asc']) : dbDeliverables;
    // };
}