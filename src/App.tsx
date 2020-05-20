import React from "react";
import { MapComponent } from "./components/templates/map";
import "@progress/kendo-theme-default/dist/all.css";
import { DashboardComponent } from "./components/templates/dashboard";
import DrawerRouterContainer from "./navigation/DrawerRouterContainer";

import { HashRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <HashRouter>
        <DrawerRouterContainer>
          <Switch>
            <Route exact={true} path="/" component={MapComponent} />
            <Route
              exact={true}
              path="/dashboard"
              component={DashboardComponent}
            />{" "}
            />
          </Switch>
        </DrawerRouterContainer>
      </HashRouter>
      <style>
        {`my-app {
            padding: 0;
        }
        .k-drawer-container {
            position: fixed;
            width: 100%;
            height: 100%;
        }
        .k-drawer-item {
            user-select: none;
        }
        .k-icon {
            font-size: 20px;
        }
        .page ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .page li {
            font-size: 1.2em;
            background: 0 0;
            border-radius: 0;
            border-width: 0 0 1px;
            border-color: rgba(33, 37, 41, 0.125);
            border-style: solid;
            line-height: 1.5em;
            padding: 1.09em .84em 1.23em .84em;
        }
        .page li:last-child {
            border: 0;
        }`}
      </style>
    </React.Fragment>
  );
}

export default App;
