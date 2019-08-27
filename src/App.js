import React, { Component } from "react";
import "./App.css";
import Form from "./Components/Form";
import Logo from "./Components/Logo";
import StatBoxs from "./Components/StatBoxs";
import { resolve } from "path";
import { reject } from "q";
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
    matchEntryPGCR: [{}],
    matchesToShow: [{}],
    selectedRadioBtn: "200",
    noMatchFoundBool: false,
    currentPage: 0,
    shouldGetMoreMatchBool: true,
    shouldGetMorePGCRBool: true
  };

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
                <div className="col-7 form-container">
                  <Form
                    onFInputChange={this.onFInputChange}
                    onSInputChange={this.onSInputChange}
                    handleClickFetch={this.handleClickFetch}
                    isLoading={this.state.isLoading}
                    hasFoundResults={this.state.hasFoundResults}
                    selectedRadioBtn={this.selectedRadioBtn}
                    onRadioBtnChange={this.onRadioBtnChange}
                  />

                  {this.state.matchesToShow.length > 1 && (
                    <StatBoxs
                      matchesToShow={this.state.matchesToShow}
                      firstMembershipId={this.state.firstMembershipId}
                      secondMembershipId={this.state.secondMembershipId}
                      handleClickNextPage={this.handleClickNextPage}
                    />
                  )}
                  {this.state.matchesToShow.length <= 1 &&
                    this.state.noMatchFoundBool && <h2>No matches found...</h2>}
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
    while (this.state.shouldGetMoreMatchBool) {
      await this.getActivityHistory(settings);
      setInterval(2500);
    }
    setInterval(1000);
    // while (this.state.shouldGetMorePGCRBool) {
    //   await this.get200PostGameCarnageReport(settings);
    //   setInterval(2500);
    // }
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

  getActivityHistory = async settings => {
    const fetchUrl =
      "https://www.bungie.net/Platform/Destiny2/" +
      this.state.membershipType +
      "/Account/" +
      this.state.firstMembershipId +
      "/Character/" +
      this.state.characterIds[0] +
      "/Stats/Activities/?count=" +
      this.state.selectedRadioBtn +
      "&mode=5&page=" +
      this.state.currentPage;

    const response = await axios.get(fetchUrl, settings);

    if (Object.keys(response.data.Response).length >= 1) {
      console.log("finded");
      this.setState({ currentPage: this.state.currentPage + 1 });
      this.setState(prevState => ({
        activitiesList: [
          ...prevState.activitiesList,
          response.data.Response.activities
        ]
      }));
    } else {
      var arr1d = [].concat(...this.state.activitiesList);
      this.setState({ activitiesList: arr1d });
      this.setState({ shouldGetMoreMatchBool: false });
      console.log("no more matches");
    }
  };

  get200PostGameCarnageReport = async settings => {
    // var activitiesList = [...this.state.activitiesList];
    // var requests = activitiesList.map(e => {return await this.getPgcrPromise(e.activityDetails)})
    // this.setState(prevState => ({
    //   matchEntryPGCR: [...prevState.matchEntryPGCR, response.data.Response]
    // }));
    // setInterval(100);
  };

  getPgcrPromise = async (activityId, settings) => {
    const fetchUrl =
      "https://www.bungie.net/Platform/Destiny2/Stats/PostGameCarnageReport/" +
      activityId +
      "/";
    var response = await axios.get(fetchUrl, settings);
    setInterval(200);
    return {
      data: response.data.Response
    };
  };

  checkIfPlayed = () => {
    var copyArr = [...this.state.matchEntryPGCR];

    // Here we get the standing value (which team 0/1) of the first username
    var standingValue = copyArr[copyArr.length - 1].entries.find(e => {
      return (
        e.player.destinyUserInfo.membershipId === this.state.firstMembershipId
      );
    });
    // Here we check for every player with different standing value if they are the second username given
    copyArr[copyArr.length - 1].entries.forEach(e => {
      if (e.standing !== standingValue.standing) {
        if (
          e.player.destinyUserInfo.membershipId ===
          this.state.secondMembershipId
        ) {
          this.setState(prevState => ({
            matchesToShow: [
              ...prevState.matchesToShow,
              copyArr[copyArr.length - 1]
            ]
          }));
        }
      }
    });
    this.timeOutNoMatchFoundBool();
    this.setState({ isLoading: false });
  };

  onFInputChange = e => {
    this.setState({ firstInputValue: e.target.value });
  };
  onSInputChange = e => {
    this.setState({ secondInputValue: e.target.value });
  };

  onRadioBtnChange = e => {
    this.setState({ selectedRadioBtn: e.target.value });
  };

  timeOutNoMatchFoundBool = () => {
    if (this.state.selectedRadioBtn === "50") {
      setTimeout(() => {
        this.setState({ noMatchFoundBool: true });
      }, 3000);
    }
    if (this.state.selectedRadioBtn === "100") {
      setTimeout(() => {
        this.setState({ noMatchFoundBool: true });
      }, 7000);
    }
    if (this.state.selectedRadioBtn === "200") {
      setTimeout(() => {
        this.setState({ noMatchFoundBool: true });
      }, 8000);
    }
  };

  handleClickFetch = () => {
    var settings = {
      method: "GET",
      headers: {
        "x-api-key": "cc8fc21c337a4399b94e9e11e7d908b8"
      }
    };

    this.setState({ isLoading: true });
    this.setState({ matchesToShow: [{}] });
    this.setState({ matchEntryPGCR: [{}] });

    this.FetchBehaviour("bax#21629", "tara#22686", settings); //"auriel#21174"
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
}

export default App;
