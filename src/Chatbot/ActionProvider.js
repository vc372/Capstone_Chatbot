// ActionProvider starter code
import fetchEmotion from './API_Retrieval/fetchEmotion';
import takeScreenshot from './API_Retrieval/takeScreenshot';
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  async start(webcamref) {
    let image = takeScreenshot(webcamref)
    let emotion = await fetchEmotion(image)
    let startMessage = ''
    if(emotion === 'happy'){
      startMessage = this.createChatBotMessage('Somebody is in a good mood 😊, wanna tell me what happened today?')
    } else if(emotion === 'sad'){
      startMessage = this.createChatBotMessage('Something bothering you today?')
    } else {
      startMessage = this.createChatBotMessage('How was your day?')
    }
    
    this.updateChatbotState(startMessage)
  }

  greet() {
    const greetingMessage = this.createChatBotMessage("Hi, friend.")
    this.updateChatbotState(greetingMessage)
  }

  sayGoodbye() {
    const goodbyeMessage = this.createChatBotMessage("Thanks for chatting! Come back anytime :)")
    this.updateChatbotState(goodbyeMessage)
  }

  askForAssistance() {
    const assistanceMessage = this.createChatBotMessage("I'm designed to help you release some steam! What seems to be bothering you?")
    this.updateChatbotState(assistanceMessage)
  }

  giveName() {
    const nameMessage = this.createChatBotMessage("I'm Health Bot, your virtural friend.")
    this.updateChatbotState(nameMessage)
  }

  giveAppreciation(){
    const appreciativeMessage = this.createChatBotMessage("You're very welcome, I'm glad to have helped")
    this.updateChatbotState(appreciativeMessage)
  }

  askForExplanation(){
    const appreciativeMessage = this.createChatBotMessage("I couldn't quite understand you, can you rephrase that in another way?")
    this.updateChatbotState(appreciativeMessage)
  }



  
  updateChatbotState(message) {
 
// NOTE: This function is set in the constructor, and is passed in      // from the top level Chatbot component. The setState function here     // actually manipulates the top level state of the Chatbot, so it's     // important that we make sure that we preserve the previous state.
 
   this.setState(prevState => ({
    	...prevState, messages: [...prevState.messages, message]
    }))
  }
}


export default ActionProvider;
