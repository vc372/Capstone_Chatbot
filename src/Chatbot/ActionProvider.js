// ActionProvider starter code
import fetchEmotion from './API_Retrieval/fetchEmotion';
import takeScreenshot from './API_Retrieval/takeScreenshot';
import StartUpMessage from './Responses/StartUpMessage.json';
import relationship_response from './Responses/relationship_response.json';
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  async startConversation(webcamref) {

    let image = takeScreenshot(webcamref)
    
    let delay = Math.floor(Math.random() * 500)
    let startMessage1 = this.createChatBotMessage('So my job is to help you find resources 📔 that maybe can give you some more perspective on whatever is on your mind.', delay)
    this.updateChatbotState(startMessage1)

    let emotion = await fetchEmotion(image)
    console.log(emotion)
    let startMessage = this.retrieveResponse(StartUpMessage['emotions'], emotion, true)
    startMessage = this.createChatBotMessage(startMessage)
    this.updateChatbotState(startMessage)

    let topic = 'Problems'
    this.updateConversationDirection(topic)
  }

  askConfirmation(issue){
    let msg = this.createChatBotMessage('Just to confirm, you are talking about ' + issue, {
      widget: 'ConfirmationOptions'
    })
    this.updateConversationIssue(issue)
    this.updateChatbotState(msg)
  }

  askQuestionAboutIssue(issue) {
    let msg = this.createChatBotMessage('So what do you believe to be the cause of your ' + issue + ' problem?')
    this.updateChatbotState(msg)
  }

  askWhichIssue() {

  }

  provideRelationshipResources(cause) {
    console.log(relationship_response['intents'])
    let response = this.retrieveResponse(relationship_response['intents'], cause, false)

    let hyperLink = response[1]
    this.updateLink(hyperLink)

    let hyperLinkMsg = this.createChatBotMessage(response[0], {
      widget: 'HyperLink'
    })
    this.updateChatbotState(hyperLinkMsg)
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

  retrieveResponse(json, label, random){
    console.log(json)
    for(var i = 0; i < json.length; i++){
      if(json[i]['tag'] === label){
        if(random){
          return json[i]['patterns'][Math.floor(Math.random() * json[i]['patterns'].length)]
        } 

        return json[i]['patterns']
           
      }
    }

    return 'Could not identify label'
  }

  updateLink(link){
    this.setState(prevState => ({
      ...prevState, link: link, messages: [...prevState.messages]
    }))
  }
  updateConversationDirection(topic) {
    this.setState(prevState => ({
      ...prevState, topic: topic, messages: [...prevState.messages]
    }))
  }

  updateConversationIssue(issue) {
    this.setState(prevState => ({
      ...prevState, issue: issue, messages: [...prevState.messages]
    }))
  }

  updateChatbotState(message) {
   this.setState(prevState => ({
    	...prevState, messages: [...prevState.messages, message]
    }))
  }
}


export default ActionProvider;
