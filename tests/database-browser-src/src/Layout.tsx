
import React from "react";
import { Outlet, Link } from "react-router-dom";
import { CommonNavigationFunctions } from "./utils/navigation-helpers";

export default class Layout extends React.Component { 
    render() {
        return (
            <>
            <nav>
              <ul>
                <li>
                  <a href="https://shinytracker.app">Home</a>
                </li>
                <li>
                  <Link to="/browser">Database Terminal</Link>
                </li>
                <li>
                  <Link to="/timeline" onClick={() => CommonNavigationFunctions.refresh()}>Scheduled Work Timeline</Link>
                </li>
              </ul>
            </nav>
            <Outlet />
          </>
        );
    }
}
