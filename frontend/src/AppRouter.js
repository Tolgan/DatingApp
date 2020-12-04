import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import Header from "./components/Header";
import Matches from "./components/Matches";
import "./styles.css";

export default function AppRouter() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Route path="/" component={App} exact />
        <Route path="/matches" component={Matches} />
      </div>
    </Router>
  );
}
