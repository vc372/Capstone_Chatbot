import React from "react";

import "./options.css";

const StartUpOptions = (props) => {
  const options = [
    { text: "Ready to Get Started!", handler: () => props.actionProvider.start(props.webcam), id: 1 },
    { text: "Still have more questions..", handler: () => {}, id: 2 },
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

export default StartUpOptions;