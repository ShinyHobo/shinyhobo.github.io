
import React from "react";
import { Outlet, Link } from "react-router-dom";
import { CommonNavigationFunctions } from "./utils/navigation-helpers";

export default class Layout extends React.Component { 
    render() {
        return (
            <>
            <nav style={{marginLeft: 10}}>
                <span>
                  <a href="https://shinytracker.app">Home</a>
                </span>
                <span>
                  <Link to="/browser">Database Terminal</Link>
                </span>
                <span>
                  <Link to="/timeline" onClick={CommonNavigationFunctions.refresh}>Scheduled Work Timeline</Link>
                </span>
            </nav>
            <Outlet />
          </>
        );
    }
}
