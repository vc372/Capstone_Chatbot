import React from "react";

import "./options.css";

const FinishGratitudeJournalingOption = (props) => {
  const options = [
    { text: "I\'m Finished", handler: () => props.actionProvider.reviewJournalEntries(), id: 1 },
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

export default FinishGratitudeJournalingOption;