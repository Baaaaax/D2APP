import React, { Component } from "react";

const MatchEntry = props => {
  return (
    <div className="match-entry">
      <div className="details">
        <a
          href={`https://destinytracker.com/d2/pgcr/${props.matchInstanceId}`}
          className="title"
        >
          {decodeMap(props.matchMode)}
        </a>
        <span className="subtitle">{props.matchDate}</span>
      </div>
    </div>
  );
};

const decodeMap = mode => {
  const codedModeList = {
    AllPvP: 5,
    Control: 10,
    Reserved11: 11,
    Clash: 12,
    Reserved13: 13,
    "Crimson Doubles": 15,
    "Iron Banner": 19,
    Reserved20: 20,
    Reserved21: 21,
    Reserved22: 22,
    Reserved24: 24,
    AllMayhem: 25,
    Reserved26: 26,
    Reserved27: 27,
    Reserved28: 28,
    Reserved29: 29,
    Reserved30: 30,
    Supremacy: 31,
    "Private Matches All": 32,
    Survival: 37,
    Countdown: 38,
    "Trials Of The Nine": 39,
    "Trials Countdown": 41,
    "Trials Survival": 42,
    "IronBanner Control": 43,
    "IronBanner Clash": 44,
    "IronBanner Supremacy": 45,
    Rumble: 48,
    "All Doubles": 49,
    Doubles: 50,
    "Private Matches Clash": 51,
    "Private Matches Control": 52,
    "Private Matches Supremacy": 53,
    "Private Matches Countdown": 54,
    "Private Matches Survival": 55,
    "Private Matche sMayhem": 56,
    "Private Matches Rumble": 57,
    Showdown: 59,
    Lockdown: 60,
    Breakthrough: 65,
    Salvage: 67,
    "Iron Banner Salvage": 68,
    "PvP Competitive": 69,
    "PvP Quickplay": 70,
    "Clash Quickplay": 71,
    "Clash Competitive": 72,
    "Control Quickplay": 73,
    "Control Competitive": 74
  };
  for (var i in codedModeList) {
    if (codedModeList[i] == mode) {
      return i;
    }
  }
};

export default MatchEntry;
