import type { Component } from 'solid-js';
import { Router, Route } from "@solidjs/router";

import logo from './logo.svg';
import styles from './App.module.css';

import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import _404 from './pages/_404';

const Root: Component = () => {

  return (
    <div>
      <Router>
          <Route path={"/"} component={Login}/>
          <Route path={"/dashboard"} component={Dashboard}/>
          <Route path={"*404"} component={_404}/>
      </Router>
    </div>
  );
};

export default Root;
