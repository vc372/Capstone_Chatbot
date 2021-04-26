import React, { useState } from "react";
import './JournalEntryDisplayStyle.css'
const JournalEntryDisplay = (props) => {
	const init = () => {
		let msgArray=[]
		props.journalMessageNumberArray.map((number, index) => (
			msgArray.push([index, props.messages[number]['message']])
		));
		return msgArray
	}

	const [msgArray, updateMsgArray] = useState(init())

	const handleRemoveItem = (e) => {
   		const name = e.target.getAttribute("name")
   		console.log(name)
    	updateMsgArray(msgArray.filter(item => item[0] !== parseInt(name)));
    	console.log(msgArray)
  	};

	const journalMarkup = msgArray.map((msg) => (
		<span className='JournalEntry' key={msg[0]} onClick={handleRemoveItem} name={msg[0]}>{msg[1]}</span>
		
	));

	

	return <div className='JournalContainer'>{journalMarkup}</div>;
}

export default JournalEntryDisplay;