import React, { Component } from "react";
import MatchEntry from "./MatchEntry";

class StatBoxs extends Component {
  state = {
    matchesToShowIndexes: [1, 4]
  };

  render() {
    const {
      isLoading,
      matchesToShow,
      firstMembershipId,
      secondMembershipId,
      handleNext500Fetch,
      activitiesListCount,
      canFetchAgain
    } = this.props;
    return (
      <div className="container main-statsbox">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="prev-page-container">
                <button
                  type="button"
                  id="prevPageBtn"
                  className="btn btn-info btn-md"
                  onClick={() => this.handleClickPage("prev")}
                  disabled={isLoading}
                >
                  <span>Prev</span>
                </button>
              </div>
            </div>
            <div className="col-4">
              <button
                type="button"
                className="btn btn-info btn-md"
                onClick={handleNext500Fetch}
                disabled={!canFetchAgain && isLoading}
              >
                Next 500 matches
              </button>
            </div>
            <div className="col-4">
              <div className="nxt-page-container">
                <button
                  type="button"
                  id="nextPageBtn"
                  className="btn btn-info btn-md"
                  onClick={() => this.handleClickPage("next")}
                  disabled={isLoading}
                >
                  <span>Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container stats-box" style={{ "min-width": "430px" }}>
          {matchesToShow
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
      </div>
    );
  }

  handleClickPage = typeBtn => {
    if (typeBtn === "prev") {
      if (this.state.matchesToShowIndexes[0] > 1) {
        this.setState({
          matchesToShowIndexes: this.state.matchesToShowIndexes.map(e => e - 3)
        });
      }
    } else {
      if (
        this.state.matchesToShowIndexes[1] <
        this.props.matchesToShow.length - 1
      ) {
        this.setState({
          matchesToShowIndexes: this.state.matchesToShowIndexes.map(e => e + 3)
        });
      }
    }
  };
}

export default StatBoxs;
