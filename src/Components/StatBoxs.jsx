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
        <div className="container stats-box" style={{ "min-width": "430px" }}>
          <div
            class="main-carousel"
            data-flickity='{ "cellAlign": "left", "contain": true }'
          >
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
