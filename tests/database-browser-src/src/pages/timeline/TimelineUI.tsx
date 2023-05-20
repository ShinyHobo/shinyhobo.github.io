import React from "react";
import Timeline3 from "../../components/timeline3";

export default class TimelineUI extends React.Component {
    private vfs: any;

    constructor(vfs: any) {
        super(vfs);
        this.vfs = vfs;
    }

    render() {
        return (<div id="timeline-container"><Timeline3 {...this.vfs}/></div>);
    }
}