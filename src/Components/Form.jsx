import React, { Component } from "react";

const Form = props => {
  const {
    firstInputValue,
    onFInputChange,
    onSInputChange,
    secondInputValue,
    handleClickFetch,
    isLoading,
    selectedRadioBtn,
    onRadioBtnChange
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
        <div className="radio-btn-container container">
          <div className="custom-control custom-radio custom-control-inline">
            <input
              type="radio"
              id="customRadioInline1"
              name="customRadioInline1"
              className="custom-control-input"
              value="50"
              onChange={onRadioBtnChange}
              checked={selectedRadioBtn === "50"}
            />
            <label
              className="custom-control-label"
              htmlFor="customRadioInline1"
            >
              50
            </label>
          </div>
          <div className="custom-control custom-radio custom-control-inline">
            <input
              type="radio"
              id="customRadioInline2"
              name="customRadioInline1"
              className="custom-control-input"
              value="100"
              onChange={onRadioBtnChange}
              checked={selectedRadioBtn === "100"}
            />
            <label
              className="custom-control-label"
              htmlFor="customRadioInline2"
            >
              100
            </label>
          </div>
          <div className="custom-control custom-radio custom-control-inline">
            <input
              type="radio"
              id="customRadioInline3"
              name="customRadioInline1"
              className="custom-control-input"
              value="200"
              onChange={onRadioBtnChange}
              checked={selectedRadioBtn === "200"}
            />
            <label
              className="custom-control-label"
              htmlFor="customRadioInline3"
            >
              200
            </label>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Form;
