import React, { Component } from "react";

class Form extends Component {
  render() {
    return (
      <React.Fragment>
        <form>
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                value={this.props.firstInputValue}
                onChange={this.props.onFInputChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                onChange={this.props.onSInputChange}
                value={this.props.secondInputValue}
              />
            </div>
          </div>
          <button
            type="button"
            id="submitBtn"
            className="btn btn-success btn-md"
            onClick={this.props.handleClickFetch}
          >
            succc
          </button>
        </form>

        <div className="inputContainer">
          <div className="custom-control custom-radio custom-control-inline">
            <input
              type="radio"
              id="customRadioInline1"
              name="customRadioInline1"
              className="custom-control-input"
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
            />
            <label
              className="custom-control-label"
              htmlFor="customRadioInline3"
            >
              200
            </label>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Form;
