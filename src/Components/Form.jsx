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
      </form>
      <div class="radioBtn-cont">
        <input name="switch" id="one" type="radio" checked />
        <label for="one" class="switch__label">
          One
        </label>
        <input name="switch" id="two" type="radio" />
        <label for="two" class="switch__label">
          Two
        </label>
        <input name="switch" id="three" type="radio" />
        <label for="three" class="switch__label">
          Three
        </label>
        <div class="switch__indicator" />
      </div>
    </React.Fragment>
  );
};

export default Form;
