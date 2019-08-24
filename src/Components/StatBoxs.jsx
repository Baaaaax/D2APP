import React, { Component } from "react";
import MatchEntry from "./MatchEntry";

class StatBoxs extends Component {
  state = {
    matchesToShowIndexes: [0, 3]
  };

  render() {
    const {
      isLoading,
      matchesToShow,
      firstMembershipId,
      secondMembershipId
    } = this.props;
    return (
      <React.Fragment>
        <div className="nxt-page-container container">
          <button
            type="button"
            id="nextPageBtn"
            className="btn btn-info btn-md"
            onClick={this.handleClickNextPage}
            disabled={isLoading}
          >
            <span>>></span>
          </button>
        </div>
        <div className="container stats-box" style={{ "min-width": "300px" }}>
          {matchesToShow
            .filter(e => Object.getOwnPropertyNames(e).length !== 0) // checking if there are matches
            .slice(
              this.state.matchesToShowIndexes[0],
              this.state.matchesToShowIndexes[1]
            )
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
                  firstMembershipId={firstMembershipId}
                  secondMembershipId={secondMembershipId}
                />
              </div>
            ))}
        </div>
      </React.Fragment>
    );
  }

  handleClickNextPage = () => {
    this.setState({
      matchesToShowIndexes: this.state.matchesToShowIndexes.map(e => e + 3)
    });
  };
}

export default StatBoxs;
