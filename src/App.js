import React, { Component } from "react";
import "./App.scss";
import Form from "./Components/Form";
import Logo from "./Components/Logo";
import StatBoxs from "./Components/StatBoxs";

const axios = require("axios");

class App extends Component {
  state = {
    fullFetch: true,
    btnFetchCount: 0,
    fetchStartEnd: [0, 500],
    isLoading: false,
    firstInputValue: "",
    secondInputValue: "",
    fName: "",
    sName: "",
    firstMembershipId: "",
    secondMembershipId: "",
    membershipType: 0,
    characterIds: [], //titan 0,hunter 1 , warlock 2 ,
    classHashes: [0, 0, 0],
    activitiesList: [],
    activitiesListCount: 0,
    hasFoundMatches: false,
    matchEntryPGCR: [{}],
    matchesToShow: [{}],
    selectedCharacter: 0,
    moreMatchesToShow: false
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

        this.FetchBehaviour("bax#21629", "tara#22686", settings).then(r => {
          if (this.state.matchesToShow.length > 1) {
            document.querySelector(".loading-inner").style.opacity = 0;
          } else {
          }
          this.setState({ isLoading: false });
        }); //"auriel#21174" tara#22686
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

                  <div className="container loading-inner">
                    {this.state.isLoading && (
                      <div class="centered-spinner">
                        <div class="cm-spinner"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  FetchBehaviour = async (firstInputName, secondInputName, settings) => {
    if (this.state.fullFetch) {
      await this.getMembershipsId(firstInputName, secondInputName, settings);
      await this.getProfile(settings);
      await this.getHistoricalStats(settings);
      await this.getActivityHistory(settings);
      if (this.state.hasFoundMatches) {
        await this.getPostGameCarnageReport(
          this.state.fetchStartEnd[0],
          this.state.fetchStartEnd[1],
          settings
        );
        await this.checkIfPlayed();
      }
    } else {
      await this.getPostGameCarnageReport(
        this.state.fetchStartEnd[0],
        this.state.fetchStartEnd[1],
        settings
      );
      await this.checkIfPlayed();
    }
  };
  getMembershipsId = async (firstInputName, secondInputName, settings) => {
    this.setState({ fName: firstInputName, sName: secondInputName });
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
      "/?components=100,200";

    const response = await axios.get(fetchUrl, settings);
    console.log(response);

    this.setState({
      characterIds: response.data.Response.profile.data.characterIds,
      membershipType:
        response.data.Response.profile.data.userInfo.membershipType,
      classHashes: Object.keys(response.data.Response.characters.data).map(
        e => {
          return response.data.Response.characters.data[e].classHash;
        }
      )
    });

    await this.setCharacterOrder(response.data.Response.characters.data);
  };

  setCharacterOrder = async characterObj => {
    console.log(characterObj);
    var copyArr = [...this.state.characterIds];
    Object.keys(characterObj).forEach(e => {
      switch (characterObj[e].classType) {
        case 0:
          if (e !== copyArr[0]) {
            console.log("old copy arr ", copyArr);
            this.insertAndShift(copyArr, copyArr.indexOf(e), 0);
            console.log("new copy arr ", copyArr);
          }
          break;
        case 1:
          if (e !== copyArr[1]) {
            console.log("old copy arr ", copyArr);
            this.insertAndShift(copyArr, copyArr.indexOf(e), 1);
            console.log("new copy arr ", copyArr);
          }
          break;
        case 3:
          if (e !== copyArr[2]) {
            console.log("old copy arr ", copyArr);
            this.insertAndShift(copyArr, copyArr.indexOf(e), 2);
            console.log("new copy arr ", copyArr);
          }
          break;
      }
    });
    this.setState({ characterIds: copyArr });
  };

  insertAndShift = (arr, from, to) => {
    let cutOut = arr.splice(from, 1)[0]; // cut the element at index 'from'
    return arr.splice(to, 0, cutOut); // insert it at index 'to'
  };

  getHistoricalStats = async settings => {
    const fetchUrl =
      "https://www.bungie.net/Platform//Destiny2/" +
      this.state.membershipType +
      "/Account/" +
      this.state.firstMembershipId +
      "/Character/" +
      this.state.characterIds[this.state.selectedCharacter] +
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
      if ((!arr1d[0], !arr1d[1], !arr1d[2])) {
        // check if we finded matches
        console.log("no matches found");
        this.setState({ hasFoundMatches: false });
      } else {
        this.setState({ hasFoundMatches: true });
        this.setState({ activitiesList: arr1d });
      }
    }
  };

  activityFetch = async (settings, currentPage) => {
    var index = this.state.selectedCharacter;
    console.log(index);
    const fetchUrl =
      "https://www.bungie.net/Platform/Destiny2/" +
      this.state.membershipType +
      "/Account/" +
      this.state.firstMembershipId +
      "/Character/" +
      this.state.characterIds[index] +
      "/Stats/Activities/?count=200&mode=5&page=" +
      currentPage;

    console.log(fetchUrl);

    const response = await axios.get(fetchUrl, settings);
    console.log("fething data...", response);
    return {
      data: response.data
    };
  };

  getPostGameCarnageReport = async (start, end, settings) => {
    var arr = this.state.activitiesList;

    if (arr.length < 250) {
      var requests = arr
        .filter(e => {
          return e !== "error";
        })
        .map(f => {
          return this.pgcrFetch(f.activityDetails.instanceId, settings).then(
            a => {
              return a;
            }
          );
        });

      var response = await Promise.all(requests);
      console.log(response);
      this.setState({
        matchEntryPGCR: response
      });
    } else {
      var preV = start;
      var curr = end / 2;

      for (let i = 0; i < 3; i++) {
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
        preV = preV + 250;
        curr = curr + 250;

        if (curr === 750) {
          var arr1d = [].concat(...this.state.matchEntryPGCR).slice(1);
          this.setState({ matchEntryPGCR: arr1d });
          break;
        }
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
      if (e !== "error" && e.data) {
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
    if (this.state.btnFetchCount === 0) {
      // If is the first time we click
      this.setState({
        isLoading: true,
        btnFetchCount: this.state.btnFetchCount + 1
      });
      document.querySelector(".loading-inner").style.opacity = 1;
    } else {
      if (
        // if the input changes we will reset and refetch
        this.state.firstInputValue !== this.state.fName ||
        this.state.secondInputValue !== this.state.sName
      ) {
        this.handleResetState();
        this.setState({
          isLoading: true,
          btnFetchCount: this.state.btnFetchCount + 1
        });
        document.querySelector(".loading-inner").style.opacity = 1;
      } else {
        // else we don't do a full fetch
        console.log("same name");
        this.setState({
          isLoading: true,
          btnFetchCount: this.state.btnFetchCount + 1,
          fullFetch: false
        });
        document.querySelector(".loading-inner").style.opacity = 1;
      }
    }
  };

  handleResetState = () => {
    this.setState({
      fullFetch: true,
      firstMembershipId: "",
      secondMembershipId: "",
      membershipType: 0,
      characterIds: [], //titan 0,hunter 1 , warlock 2 ,
      classHashes: [0, 0, 0],
      activitiesList: [],
      activitiesListCount: 0,
      hasFoundMatches: false,
      matchEntryPGCR: [{}],
      matchesToShow: [{}],
      fName: "",
      sName: ""
    });
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
