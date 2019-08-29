import React, { Component } from "react";

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
        <div className="container">
          <ul className="character-container">
            <li>
              <div className="hunterCont">
                <input
                  type="radio"
                  id="hunterBtn"
                  name="hunterB"
                  className=""
                  value="0"
                  onChange={onCharacterChange}
                  checked={selectedCharacter === 0}
                />
                <label className="hunterB" htmlFor="hunterBtn">
                  Hunter
                </label>
                <div class="check"></div>
              </div>
            </li>
            <li>
              <div className="warlockCont">
                <input
                  type="radio"
                  id="warlockBtn"
                  name="warlockB"
                  className=""
                  value="1"
                  onChange={onCharacterChange}
                  checked={selectedCharacter === 1}
                />
                <label className="warlockB" htmlFor="warlockBtn">
                  Warlock
                </label>
                <div class="check">
                  <div class="inside"></div>
                </div>
              </div>
            </li>
            <li>
              <div className="titanCont">
                <input
                  type="radio"
                  id="titanBtn"
                  name="titanB"
                  className=""
                  value="2"
                  onChange={onCharacterChange}
                  checked={selectedCharacter === 2}
                />
                <label className="titanB" htmlFor="titanBtn">
                  Titan
                </label>
                <div class="check">
                  <div class="inside"></div>
                </div>
              </div>
            </li>
          </ul>
          <input type="radio" />
          <input type="radio" />
          <input type="radio" />
        </div>
      </form>
    </React.Fragment>
  );
};

export default Form;
