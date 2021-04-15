
// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";

const config = (webcamRef) =>{
	return {

		initialMessages: [createChatBotMessage(`Hello world`)], 
		state: {
			topics: ['greeting', 'goodbye', 'help', 'name', 'appreciation', 'issues'], 
		  	webcam: webcamRef
		}

	}
}

export default config