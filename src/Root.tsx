import type { Component } from 'solid-js';
import { Router, Route } from "@solidjs/router";

import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import _404 from './pages/_404';
import RouteGuard from './components/RouteGuard';
import { PopupProvider } from './utils/PopupContext';

const Root: Component = () => {

  return (
    <div>
      <Router>
          <Route path={"/"} component={Login}/>
          <Route path={"*404"} component={_404}/>
          <Route path={"/"} component={RouteGuard}>
            <PopupProvider>
              <Route path={"/dashboard"} component={Dashboard}/>
            </PopupProvider>
          </Route>
      </Router>
    </div>
  );
};

export default Root;
