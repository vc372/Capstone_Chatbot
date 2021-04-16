// MessageParser starter code
import fetchEmotion from './API_Retrieval/fetchEmotion';
import fetchResponseType from './API_Retrieval/fetchResponseType';
import takeScreenshot from './API_Retrieval/takeScreenshot';
class MessageParser{

  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  async parse(message) {
  	
    let image = takeScreenshot(this.state.webcam)
    let currentEmotion = await fetchEmotion(image)
    let currentResponseType = await fetchResponseType(message)
    this.setEmotion(currentEmotion)
    this.setTopic(currentResponseType)
    console.log(this.state)
    
    switch(this.state.topic){

     case 'greeting':
     this.actionProvider.greet()
     break;

     case 'goodbye':
     this.actionProvider.sayGoodbye()
     break;

     case 'help':
     this.actionProvider.askForAssistance()
     break;

     case 'name':
     this.actionProvider.giveName()
     break;

     case 'appreciation':
     this.actionProvider.giveAppreciation()
     break;

     case 'issues':
     break;

     default:
     this.actionProvider.askForExplanation()

   }



 }

 setTopic(topic) {
   this.state.topic = topic
 }

 setEmotion(emotion) {
  this.state.emotion = emotion
}
}

export default MessageParser;

