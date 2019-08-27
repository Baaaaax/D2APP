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

  // if we find matches in the activtiy history , we call again this function with the next page
  if (Object.keys(data.Response).length >= 1) {
    console.log("finded");
    this.setState({ currentPage: this.state.currentPage + 1 });
    this.setState(prevState => ({
      activitiesList: [...prevState.activitiesList, data.Response.activities]
    }));
    this.getActivityHistory(settings);
  } else {
    // else if there are no more matches we call the getpostgamecarnage
    console.log("got all matches");
    if (this.state.activitiesList) {
      var copyArr = [...this.state.activitiesList];
      var arr1d = [].concat(...copyArr);
      console.log(arr1d.length);
      if (arr1d.length > 200) {
        var prevValue = 1;
        for (let i = 201; i < arr1d.length; i += 200) {
          const requests = arr1d.slice(prevValue, i).map(f => {
            return this.getPostGameCarnageReport(
              f.activityDetails.instanceId,
              settings
            );
          });
          const re = await Promise.all(requests);
          console.log(re, "200 fetched and ready");

          prevValue += 200;
          if (i + 200 > arr1d.length) {
            const requests = arr1d.slice(arr1d.length - i, i).map(f => {
              return this.getPostGameCarnageReport(
                f.activityDetails.instanceId,
                settings
              );
            });
            const re = await Promise.all(requests);
            console.log(re, "less  tha 00 fetched and ready");
          }
        }
      } else {
        const requests = arr1d.slice(1, arr1d.length).map(f => {
          return this.getPostGameCarnageReport(
            f.activityDetails.instanceId,
            settings
          );
        });

        console.log(requests);
      }
    }
  }
};
