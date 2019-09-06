import React, { Component } from "react";
import MatchEntry from "./MatchEntry";
import Flickity from "react-flickity-component";

import "../scripts/flickity.css";

class StatBoxs extends Component {
  state = {
    matchesToShowIndexes: [1, 4],
    matchEntries: []
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
          {this.carouselBehaviour()}
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

  carouselBehaviour = () => {
    const dividedArr = Array(
      Math.ceil(this.props.matchesToShow.length / 3)
    ).fill(0);

    console.log("divided arr ", dividedArr.length);

    var copyMatchArr = [...this.state.matchesToShowIndexes];

    return (
      <Flickity>
        {dividedArr.map((e, i) => {
          if (i !== 0) {
            copyMatchArr[0] += 4;
            copyMatchArr[1] += 4;
          }

          return this.props.matchesToShow
            .slice(copyMatchArr[0], copyMatchArr[1])
            .map(e => {
              return (
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
                    secondMembershipId={this.props.secondMembershipId}
                  />
                </div>
              );
            });
        })}
      </Flickity>
    );
  };
}

export default StatBoxs;
