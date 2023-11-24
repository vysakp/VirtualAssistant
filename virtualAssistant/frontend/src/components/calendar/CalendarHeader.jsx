import React from "react";

export const CalenderHeader = ({ dateDisplay, onNext, onBack }) => {
  return (
    <div id="header">
      <div id="monthDisplay">{dateDisplay}</div>
      <div>
        <button className="button" onClick={onBack} id="backButton">
          Back
        </button>
        <button className="button" onClick={onNext} id="nextButton">
          Next
        </button>
         
      </div>
    </div>
  );
};
