import React from "react";
import { MapComponent } from "./components/templates/map";
import "@progress/kendo-theme-default/dist/all.css";
import { DashboardComponent } from "./components/templates/dashboard";
import DrawerRouterContainer from "./navigation/DrawerRouterContainer";

import { HashRouter, Switch, Route } from "react-router-dom";

const App = () => 
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
    </React.Fragment>

export default App;
