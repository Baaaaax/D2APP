import React, { Component } from "react";
import MatchEntry from "./MatchEntry";

class StatBoxs extends Component {
  render() {
    return (
      <div className="container sb-con">
        <div className="stats-box">
          {this.props.matchesToShow
            .filter(e => Object.getOwnPropertyNames(e).length !== 0)
            .map(e => (
              <div className="row align-items-center marginMLRow">
                <MatchEntry
                  matchMode={e.activityDetails.mode}
                  matchDate={e.period}
                  matchInstanceId={e.activityDetails.instanceId}
                  matchPlayers={e.entries}
                  firstMembershipId={this.props.firstMembershipId}
                  secondMembershipId={this.props.seceondMembershipId}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default StatBoxs;
