import React, { Component } from "react";

class MatchEntry extends Component {
  state = {};
  render() {
    return (
      <div className="match-entry">
        <div className="details">
          <a href="https://www.google.com" className="title">
            Control - Quickplay
          </a>
          <span className="subtitle">Pacifica - 01-01-2019</span>
        </div>
      </div>
    );
  }
}

export default MatchEntry;
