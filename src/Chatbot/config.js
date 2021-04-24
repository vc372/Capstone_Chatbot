
// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import StartUpOptions from './CustomComponents/Options/StartUpOptions';
import ConfirmationOptions from './CustomComponents/Options/ConfirmationOptions';
import HyperLink from './CustomComponents/HyperLink';
import TopicOptions from './CustomComponents/Options/TopicOptions';
import FinishOption from './CustomComponents/Options/FinishOption';
import BotAvatar from './CustomComponents/BotAvatar';

const config = (webcamRef, name) =>{
	return {
		botName: 'KANA',
		customComponents: {
			botAvatar: (props) => <BotAvatar {...props}/>
		},

		initialMessages: [createChatBotMessage('Hi ' + name + '! I\'m KANA! I use machine learning 🤖 to try and provide relevant resources for you, while learning about your mood 😃🙃, so I can respond more appropriately!', {
			widget: 'StartUpOptions',
		})], 
		state: {
			topic: 'Problem',
			emotion: 'Neutral',
			issue: 'undetermined',
			subIssue: 'undetermined',
			cause: 'undetermined',
			link: 'undetermined',
			name: name,
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
			}, 

			{
				widgetName: 'TopicOptions', 
				widgetFunc: (props) => <TopicOptions {...props}/>
			}, 

			{
				widgetName: 'FinishOption', 
				widgetFunc: (props) => <FinishOption {...props}/>
			}

		],
		

	}

}

	export default config