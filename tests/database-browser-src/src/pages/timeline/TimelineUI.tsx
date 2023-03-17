import React from "react";
import Timeline2 from "../../components/timeline2";

export default class TimelineUI extends React.Component {
    private vfs: any;

    constructor(vfs: any) {
        super(vfs);
        this.vfs = vfs;
    }

    render() {
        return (<div id="timeline-container"><Timeline2 {...this.vfs}/></div>);
    }
}