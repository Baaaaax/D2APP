import React, { Component } from "react";

const Form = props => {
  const {
    firstInputValue,
    onFInputChange,
    onSInputChange,
    secondInputValue,
    handleClickFetch,
    handleClickNextPage,
    hasFoundResults,
    isLoading,
    selectedRadioBtn,
    onRadioBtnChange
  } = props;

  return (
    <React.Fragment>
      <form>
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              value={firstInputValue}
              onChange={onFInputChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={onSInputChange}
              value={secondInputValue}
            />
          </div>
        </div>
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
        <button
          type="button"
          id="nextPageBtn"
          className="btn btn-info btn-md"
          onClick={handleClickNextPage}
          disabled={hasFoundResults}
        >
          {isLoading && <span>Loading..</span>}
          {!isLoading && <span>Next page</span>}
        </button>
      </form>

      <div className="inputContainer">
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
          <label className="custom-control-label" htmlFor="customRadioInline1">
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
          <label className="custom-control-label" htmlFor="customRadioInline2">
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
          <label className="custom-control-label" htmlFor="customRadioInline3">
            200
          </label>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Form;
