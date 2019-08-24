import React, { Component } from "react";
import MatchEntry from "./MatchEntry";

class StatBoxs extends Component {
  state = {};

  render() {
    const {
      handleClickNextPage,
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
            onClick={handleClickNextPage}
            disabled={isLoading}
          >
            {isLoading && <span>Loading..</span>}
            {!isLoading && <span>Next page</span>}
          </button>
        </div>
        <div className="container stats-box" style={{ "min-width": "300px" }}>
          {matchesToShow
            .filter(e => Object.getOwnPropertyNames(e).length !== 0) // skipping first empty object in the arr
            .slice(0, 3)
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
}

export default StatBoxs;
