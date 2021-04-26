import React from "react";

import "./options.css";

const ConfirmationOptions = (props) => {
  const options = [
    { text: "Anxiety", handler: () => props.actionProvider.askAboutFeelings('anxiety'), id: 1 },
    { text: "Relationships", handler: () => props.actionProvider.askAboutFeelings('relationship'), id: 2 },
    { text: "Self-Esteem", handler: () => props.actionProvider.askAboutFeeings('self-esteem'), id: 3 }
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