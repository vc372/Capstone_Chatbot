
// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import StartUpOptions from './CustomComponents/Options/StartUpOptions';
import ConfirmationOptions from './CustomComponents/Options/ConfirmationOptions';
import HyperLink from './CustomComponents/HyperLink';
const config = (webcamRef) =>{
	return {

		initialMessages: [createChatBotMessage(`Hi! I'm KANA! I use machine learning 🤖 to try and provide 
							relevant resources for you, while learning about your mood 😃🙃, so I can respond more appropriately!`, {
			widget: 'StartUpOptions',
		})], 
		state: {
			topic: 'Problem',
			emotion: 'Neutral',
			issue: 'undetermined',
			subIssue: 'undetermined',
			cause: 'undetermined',
			link: 'undetermined',
			webcam: webcamRef
		}, 

		widgets: [

			{
				widgetName: 'StartUpOptions',
				widgetFunc: (props) => <StartUpOptions {...props}/>,
				mapStateToProps: ['webcam', 'topic']
			},

			{
				widgetName: 'ConfirmationOptions',
				widgetFunc: (props) => <ConfirmationOptions {...props}/>,
				mapStateToProps: ['issue']

			}, 
			{
				widgetName: 'HyperLink',
				widgetFunc: (props) => <HyperLink {...props}/>, 
				mapStateToProps: ['link']
			}

		],
		

	}

}

	export default config