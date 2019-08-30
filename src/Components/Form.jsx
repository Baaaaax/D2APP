import React, { Component, useState } from "react";
import HunterLogo from "../img/pngkey.com-destiny-hunter-png-443266.png";
import TitanLogo from "../img/trzcacak.rs-destiny-titan-logo-png-2315431.png";
import WarlockLogo from "../img/ttbKXabjPKbLv2bW98v6U6VC5.png";

const Form = props => {
  const {
    firstInputValue,
    onFInputChange,
    onSInputChange,
    secondInputValue,
    handleClickFetch,
    isLoading,
    selectedCharacter,
    onCharacterChange
  } = props;

  const [charSelected, setCharSelected] = useState(0);

  const onRadioBtnChange = e => {
    setCharSelected(e.target.value);
    onCharacterChange(e);
  };

  return (
    <React.Fragment>
      <form>
        <div className="input-container container">
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                placeholder="First Username.."
                value={firstInputValue}
                onChange={onFInputChange}
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                placeholder="Second Username.."
                onChange={onSInputChange}
                value={secondInputValue}
              />
            </div>
          </div>
        </div>
        <div className="btn-container container">
          <button
            type="button"
            id="submitBtn"
            className="btn btn-success btn-md"
            onClick={handleClickFetch}
            disabled={isLoading}
          >
            {isLoading && <span>Loading..</span>}
            {!isLoading && <span>Go!</span>}
          </button>
        </div>
      </form>
      <div className="container char-cont">
        <div className="row">
          <div className="col-4">
            <label className="logo-label">
              <input
                className="inputRadio"
                name="switch"
                id="three"
                type="radio"
                value="0"
                onChange={onRadioBtnChange}
                checked={charSelected === "0"}
              />
              <img src={TitanLogo} id="titanImg" className="logo-image" />
            </label>
          </div>
          <div className="col-4">
            <label className="logo-label">
              <input
                name="switch"
                className="inputRadio"
                id="one"
                type="radio"
                value="1"
                onChange={onRadioBtnChange}
                checked={charSelected === "1"}
              />
              <img src={HunterLogo} className="logo-image" />
            </label>
          </div>
          <div className="col-4">
            <label className="logo-label">
              <input
                name="switch"
                id="two"
                type="radio"
                className="inputRadio"
                value="2"
                onChange={onRadioBtnChange}
                checked={charSelected === "2"}
              />
              <img src={WarlockLogo} className="logo-image" />
            </label>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Form;
