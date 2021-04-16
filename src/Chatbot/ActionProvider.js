// ActionProvider starter code
import fetchEmotion from './API_Retrieval/fetchEmotion';
import takeScreenshot from './API_Retrieval/takeScreenshot';
import StartUpMessage from './Intents/StartUpMessage.json'

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  async startConversation(webcamref) {
    let delay = Math.floor(Math.random() * 500)
    let startMessage1 = this.createChatBotMessage('So my job is to help you find resources 📔 that maybe can give you some more perspective on whatever is on your mind.', delay)
    this.updateChatbotState(startMessage1)

    let image = takeScreenshot(webcamref)
    let emotion = await fetchEmotion(image)

    let startMessage = this.retrieveResponse(StartUpMessage['emotions'], emotion)
    startMessage = this.createChatBotMessage(startMessage)
    this.updateChatbotState(startMessage)

    let topic = 'Problems'
    this.updateConversationDirection(topic)
  }

  startQuestioning() {
    let startMessage1= this.createChatBotMessage('Go ahead and ask some questions you have about me')
    this.updateChatbotState(startMessage1)

    let topic = 'Questions'
    this.updateConversationDirection(topic)
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

  retrieveResponse(json, label){
    console.log(json)
    for(var i = 0; i < json.length; i++){
      if(json[i]['tag'] === label){
        return json[i]['patterns'][Math.floor(Math.random() * json[i]['patterns'].length)]   
      }
    }

    return 'Could not identify label'
  }

  updateConversationDirection(topic) {
    this.setState(prevState => ({
      ...prevState, topic: topic, messages: [...prevState.messages]
    }))
  }

  updateChatbotState(message) {
 
// NOTE: This function is set in the constructor, and is passed in      // from the top level Chatbot component. The setState function here     // actually manipulates the top level state of the Chatbot, so it's     // important that we make sure that we preserve the previous state.
 
   this.setState(prevState => ({
    	...prevState, messages: [...prevState.messages, message]
    }))
  }
}


export default ActionProvider;
