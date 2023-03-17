import React from "react";
import { CommonDBFunctions, Database } from "../utils/database-helpers";
import _ from "lodash";

export default class Timeline2 extends React.Component {
    private db: Database= null;

    constructor(vfs: any) {
        super(vfs);
        this.db = vfs.db;

        CommonDBFunctions.getDeltaList(this.db).then(r => {
            console.info(r);
            CommonDBFunctions.getClosestDeltaDate(this.db, r[12]).then(r => {
                console.info(r);
            });
        });
    }

    render() {
        return (
            <div></div>
        );
    }
}