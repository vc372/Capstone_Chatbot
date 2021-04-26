import React from "react";

import "./options.css";

const GratitudeConfirmationOption = (props) => {
  const options = [
    { text: "Yes", handler: () => props.actionProvider.beginGratitudeJournaling(), id: 1 },
    { text: "No", handler: () => props.actionProvider.askWhichIssue(), id: 2 },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="option-button"
      key={option.id}
      onClick={option.handler}
    >
        {option.text}
    </button>
  ));

  return <div className="options-container">{optionsMarkup}</div>;
};

export default GratitudeConfirmationOption;