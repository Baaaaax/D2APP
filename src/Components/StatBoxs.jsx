import React, { Component } from "react";
import MatchEntry from "./MatchEntry";

class StatBoxs extends Component {
  state = {};
  render() {
    return (
      <div className="container-left">
        <div className="stats-box">
          <div className="match-list" />
          <MatchEntry />
          <MatchEntry />
          <MatchEntry />
        </div>

        <div className="stats-box" id="stats-box2">
          <div className="match-list" />
          <MatchEntry />
          <MatchEntry />
          <MatchEntry />
        </div>
      </div>
    );
  }
}

export default StatBoxs;
