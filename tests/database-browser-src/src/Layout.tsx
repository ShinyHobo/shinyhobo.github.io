
import React from "react";
import { Outlet, Link } from "react-router-dom";

export default class Layout extends React.Component { 
    render() {
        return (
            <>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/browser">Database Terminal</Link>
                </li>
                <li>
                  <Link to="/timeline">Scheduled Work Timeline</Link>
                </li>
              </ul>
            </nav>
            <Outlet />
          </>
        );
    }
}
