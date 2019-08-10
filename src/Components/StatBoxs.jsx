import React, { Component } from "react";
import MatchEntry from "./MatchEntry";

const StatBoxs = props => {
  return (
    <div className="container-left">
      <div className="stats-box">
        <div className="match-list" />
        {props.matchesToShow
          .filter(e => Object.getOwnPropertyNames(e).length !== 0)
          .map(e => (
            <MatchEntry
              matchMode={e.activityDetails.mode}
              matchDate={e.period}
              matchInstanceId={e.activityDetails.instanceId}
            />
          ))}
      </div>

      <div className="stats-box" id="stats-box2">
        <div className="match-list" />
        {props.matchesToShow
          .filter(e => Object.getOwnPropertyNames(e).length !== 0)
          .map(e => (
            <MatchEntry
              matchMode={e.activityDetails.mode}
              matchDate={e.period}
            />
          ))}
      </div>
    </div>
  );
};

export default StatBoxs;
