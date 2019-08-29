import React, { Component } from "react";
import "./App.css";
import Form from "./Components/Form";
import Logo from "./Components/Logo";
import StatBoxs from "./Components/StatBoxs";
const axios = require("axios");

class App extends Component {
  state = {
    isLoading: false,
    firstInputValue: "",
    secondInputValue: "",
    firstMembershipId: "",
    secondMembershipId: "",
    membershipType: 0,
    characterIds: [],
    activitiesList: [],
    activitiesListCount: 0,
    matchEntryPGCR: [{}],
    matchesToShow: [{}],
    selectedCharacter: 0, //hunter 0 , warlock 1 , titan 2
    currentPage: 0,
    shouldGetMoreMatchBool: true,
    shouldGetMorePGCRBool: true
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoading !== prevState.isLoading) {
      if (this.state.isLoading) {
        var settings = {
          method: "GET",
          headers: {
            "x-api-key": "cc8fc21c337a4399b94e9e11e7d908b8"
          }
        };

        this.FetchBehaviour("bax#21629", "lightning#23190", settings).then(
          r => {
            document.querySelector(".loading-inner").style.opacity = 0;
            this.setState({ isLoading: false });
          }
        ); //"auriel#21174" tara#22686
      }
    }
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container" style={{ maxWidth: 1700 }}>
              <div className="row">
                <div className="col-5 title-container">
                  <Logo />
                </div>
                <div className="col-7 form-container loading-outer">
                  <Form
                    onFInputChange={this.onFInputChange}
                    onSInputChange={this.onSInputChange}
                    handleClickFetch={this.handleClickFetch}
                    isLoading={this.state.isLoading}
                    hasFoundResults={this.state.hasFoundResults}
                    selectedCharacter={this.selectedCharacter}
                    onCharacterChange={this.onCharacterChange}
                  />

                  {this.state.matchesToShow.length > 1 && (
                    <StatBoxs
                      matchesToShow={this.state.matchesToShow}
                      firstMembershipId={this.state.firstMembershipId}
                      secondMembershipId={this.state.secondMembershipId}
                      handleClickNextPage={this.handleClickNextPage}
                    />
                  )}

                  <div className="container loading-inner">Loading...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  FetchBehaviour = async (firstInputName, secondInputName, settings) => {
    await this.getMembershipsId(firstInputName, secondInputName, settings);
    await this.getProfile(settings);
    await this.getHistoricalStats(settings);
    await this.getActivityHistory(settings);
    await this.getPostGameCarnageReport(settings);
    await this.checkIfPlayed();
  };
  getMembershipsId = async (firstInputName, secondInputName, settings) => {
    const encodedName = encodeURIComponent(firstInputName);
    const encodedName2 = encodeURIComponent(secondInputName);

    const firstFetchUrl =
      "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/4/" +
      encodedName +
      "/";
    const secondFetchUrl =
      "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/4/" +
      encodedName2 +
      "/";

    const response = await axios.get(firstFetchUrl, settings);
    const response2 = await axios.get(secondFetchUrl, settings);

    this.setState({
      firstMembershipId: response.data.Response[0].membershipId,
      secondMembershipId: response2.data.Response[0].membershipId
    });
  };

  getProfile = async settings => {
    const fetchUrl =
      "https://www.bungie.net/Platform/Destiny2/4/Profile/" +
      this.state.firstMembershipId +
      "/?components=100";

    const response = await axios.get(fetchUrl, settings);

    this.setState({
      characterIds: response.data.Response.profile.data.characterIds,
      membershipType:
        response.data.Response.profile.data.userInfo.membershipType
    });
  };

  getHistoricalStats = async settings => {
    const fetchUrl =
      "https://www.bungie.net/Platform//Destiny2/" +
      this.state.membershipType +
      "/Account/" +
      this.state.firstMembershipId +
      "/Character/" +
      this.state.characterIds[0] +
      "/Stats/";

    const response = await axios.get(fetchUrl, settings);
    this.setState({
      activitiesListCount:
        response.data.Response.allPvP.allTime.activitiesEntered.basic.value
    });
  };

  getActivityHistory = async settings => {
    var arr = Array(this.state.activitiesListCount).fill(0);

    if (arr.length <= 200) {
      return this.activityFetch(settings, 0);
    } else {
      var requests = [...arr];

      if (requests.length % 200 === 0) {
        console.log("we are here");
        requests = arr.slice(0, arr.length / 200);
      } else {
        requests = arr.slice(0, arr.length / 200 + 1);
      }
      var currPg = 0;
      var req = requests.map(e => {
        currPg++;
        return this.activityFetch(settings, currPg - 1);
      });

      const response = await Promise.all(req);

      response.forEach(e => {
        this.setState(prevState => ({
          activitiesList: [
            ...prevState.activitiesList,
            e.data.Response.activities
          ]
        }));
      });
      var arr1d = [].concat(...this.state.activitiesList);
      this.setState({ activitiesList: arr1d });
    }
  };

  activityFetch = async (settings, currentPage) => {
    const fetchUrl =
      "https://www.bungie.net/Platform/Destiny2/" +
      this.state.membershipType +
      "/Account/" +
      this.state.firstMembershipId +
      "/Character/" +
      this.state.characterIds[0] +
      "/Stats/Activities/?count=200&mode=32&page=" +
      currentPage;

    console.log(fetchUrl);

    const response = await axios.get(fetchUrl, settings);
    console.log("fething data...", response);
    return {
      data: response.data
    };
  };

  getPostGameCarnageReport = async settings => {
    var arr = this.state.activitiesList;

    var preV = 0;
    var curr = 200;
    for (let i = 0; i < arr.length / 200; i++) {
      var requests = [...arr];
      requests = arr.slice(preV, curr).map(e => {
        if (e) {
          return this.pgcrFetch(e.activityDetails.instanceId, settings).then(
            a => {
              return a;
            }
          );
        } else {
          return "error";
        }
      });

      const response = await Promise.all(requests);
      console.log(response);

      this.setState(prevState => ({
        matchEntryPGCR: [...prevState.matchEntryPGCR, response]
      }));
      preV = preV + 200;
      curr = curr + 200;
      if (curr === 600) {
        var arr1d = [].concat(...this.state.matchEntryPGCR).slice(1);
        this.setState({ matchEntryPGCR: arr1d });
        break;
      }
    }
  };

  pgcrFetch = async (activityId, settings) => {
    const fetchUrl =
      "https://www.bungie.net/Platform/Destiny2/Stats/PostGameCarnageReport/" +
      activityId +
      "/";
    var response = await axios.get(fetchUrl, settings);
    return {
      data: response.data.Response
    };
  };

  checkIfPlayed = async () => {
    var copyArr = [...this.state.matchEntryPGCR];

    copyArr.forEach(e => {
      if (e !== "error") {
        var standingValue = e.data.entries.find(f => {
          return (
            f.player.destinyUserInfo.membershipId ===
            this.state.firstMembershipId
          );
        });

        e.data.entries.forEach(g => {
          if (g.standing !== standingValue.standing) {
            if (
              g.player.destinyUserInfo.membershipId ===
              this.state.secondMembershipId
            ) {
              this.setState(prevState => ({
                matchesToShow: [...prevState.matchesToShow, e.data]
              }));
            }
          }
        });
      }
    });
  };

  onFInputChange = e => {
    this.setState({ firstInputValue: e.target.value });
  };
  onSInputChange = e => {
    this.setState({ secondInputValue: e.target.value });
  };

  onCharacterChange = e => {
    this.setState({ selectedCharacter: e.target.value });
  };

  handleClickFetch = () => {
    this.setState({ isLoading: true });
    this.setState({ matchesToShow: [{}] });
    this.setState({ matchEntryPGCR: [{}] });
    document.querySelector(".loading-inner").style.opacity = 1;
  };
  setDelay = i => {
    setTimeout(i, 3000);
  };

  // handleClickNextPage = () => {
  //   var settings = {
  //     method: "GET",
  //     headers: {
  //       "x-api-key": "cc8fc21c337a4399b94e9e11e7d908b8"
  //     }
  //   };
  //   this.setState({ isLoading: true });
  //   this.setState({ noMatchFoundBool: false });
  //   this.setState({ isUpdating: true });
  //   this.setState({ matchesToShow: [{}] });
  //   this.setState({ matchEntryPGCR: [{}] });
  //   this.getActivityHistory(settings);
  //   this.setState({ currentPage: this.state.currentPage + 1 });
  //   };
  //}
}
export default App;
