import React, { Component } from "react";
import MatchEntry from "./MatchEntry";

class StatBoxs extends Component {
  state = {
    threeMatchesArr: []
  };

  render() {
    return (
      <div className="container stats-box" style={{ "min-width": "300px" }}>
        {this.props.matchesToShow
          .filter(e => Object.getOwnPropertyNames(e).length !== 0)
          .map(e => (
            <div
              className="row align-items-center marginMLRow"
              key={e.activityDetails.instanceId}
            >
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
    );
  }
}

export default StatBoxs;
