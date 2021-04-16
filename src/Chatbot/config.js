
// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import StartUpOptions from './Options/StartUpOptions';
const config = (webcamRef) =>{
	return {

		initialMessages: [createChatBotMessage(`Hi! I'm KANA! I use machine learning 🤖 to try and provide 
							relevant resources for you, while learning about your mood 😃🙃, so I can respond more appropriately!`, {
			widget: 'StartUpOptions',
		})], 
		state: {
			topic: 'Problem', 
			emotion: 'Neutral',
			webcam: webcamRef
		}, 

		widgets: [

			{
				widgetName: 'StartUpOptions',
				widgetFunc: (props) => <StartUpOptions {...props}/>,
				mapStateToProps: ['webcam']
			},

		],
		

	}

}

	export default config