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
      <div className="container main-statsbox">
        <div className="container">
          <div className="row">
            <div className="col-6">
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
            <div className="col-6">
              {" "}
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
      </div>
    );
  }

  handleClickPage = typeBtn => {
    if (typeBtn === "prev") {
      if (this.state.matchesToShowIndexes[0] > 0) {
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
