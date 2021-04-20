import React from "react";

import "./options.css";

const ConfirmationOptions = (props) => {
  const options = [
    { text: "Yes", handler: () => props.actionProvider.askAboutFeelings(props.issue), id: 1 },
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

export default ConfirmationOptions;