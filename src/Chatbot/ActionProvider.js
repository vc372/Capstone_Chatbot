// ActionProvider starter code
import fetchEmotion from './API_Retrieval/fetchEmotion';
import takeScreenshot from './API_Retrieval/takeScreenshot';
import StartUpMessage from './Responses/StartUpMessage.json';
import relationship_response from './Responses/relationship_response.json';
import { Component } from 'react';
import fetchDetection from './API_Retrieval/fetchDetection';
// import EmotionImage from './CustomComponents/EmotionImage';

class ActionProvider extends Component{
  constructor(createChatBotMessage, setStateFunc, createClientMessage, props) {
    super(props)
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  async startConversation(webcamref) {

    let image = takeScreenshot(webcamref)
    
    let delay = Math.floor(Math.random() * 500)
    let startMessage = this.createChatBotMessage('So my job is to help you find resources 📔 that maybe can give you some more perspective on whatever is on your mind.', delay)
    this.updateChatbotState(startMessage)

    let emotion = await fetchEmotion(image)
    let detection = await fetchDetection(image)
    let faceDetectionLabelMessage = this.createChatBotMessage('Facial Detection: ' + detection)
    this.updateChatbotState(faceDetectionLabelMessage)

    let emotionLabelMessage;
    let topic = 'Problems' 
    switch(emotion){
      case('happy'):
        emotionLabelMessage = this.createChatBotMessage('Facial Emotion: ' + emotion + ' 😄');
        topic = 'Gratitude'
      break;
      case('neutral'):
        emotionLabelMessage = this.createChatBotMessage('Facial Emotion: ' + emotion + ' 😐');
      break;
      case('sad'):
        emotionLabelMessage = this.createChatBotMessage('Facial Emotion: ' + emotion + ' 😔');
      break;
    }
    this.updateConversationDirection(topic)

    this.updateChatbotState(emotionLabelMessage)

    let emotionSpecificResponse = this.retrieveResponse(StartUpMessage['emotions'], emotion, true)
    emotionSpecificResponse = this.createChatBotMessage(emotionSpecificResponse)
    this.updateChatbotState(emotionSpecificResponse)

    if(emotion === 'happy') {
      let gratitudeJournalingMsg = this.createChatBotMessage('Would you like to begin Gratitude Journaling?', {
          widget: 'GratitudeConfirmationOption'
        })
      this.updateChatbotState(gratitudeJournalingMsg)
    }
    
    
  }

  beginGratitudeJournaling(){
    let msg = this.createChatBotMessage('So you can start by letting me know all the goods things that happened today 🥳, no matter how big or small!')
    this.updateChatbotState(msg)
  }

  acknowledgeJournalEntry(number){
    let msg = this.createChatBotMessage('That\'s Awesome!')
    this.updateChatbotState(msg)

    let msg2 = this.createChatBotMessage('Anything else?', {
      delay: 250, 
      widget: 'FinishGratitudeJournalingOption'
    })
    this.updateChatbotState(msg2)

    this.updateJournalEntryNumber(number)
  }

  reviewJournalEntries(){
    let msg = this.createChatBotMessage('Here are your entries. Click on a message to remove it from your list.', {
      widget: 'JournalEntryDisplay'
    })
    this.updateChatbotState(msg)
  }


  askConfirmation(issue){
    let msg1 = this.createChatBotMessage('Your feelings are valid.')
    this.updateChatbotState(msg1)
    let msg2 = this.createChatBotMessage('Just form my sake, you are talking about: ' + issue, {
      widget: 'ConfirmationOptions',
      delay: 2000
    })
    this.updateChatbotState(msg2)
    this.updateConversationIssue(issue)
  }

  acknowledge(){
    let msg = this.createChatBotMessage('I understand')
    this.updateChatbotState(msg)

    let msg2 = this.createChatBotMessage('go on..', {
      delay: 500, 
      widget: 'FinishOption'
    })
    this.updateChatbotState(msg2)
  }
  askAboutFeelings(issue) {
    this.updateConversationIssue(issue)
    let msg1 = this.createChatBotMessage('It\'s normal for even the best of relationships to not be perfect.')
    this.updateChatbotState(msg1)
    let msg2 = this.createChatBotMessage('Tell me everything that\'s on your mind about your ' + issue, {
      delay: 2000
    })
    this.updateChatbotState(msg2)
    this.updateConversationDirection('Listening')
  }

  askQuestionAboutIssue() {
    let msg = this.createChatBotMessage('So tell me why do you think you feel this way?')
    this.updateChatbotState(msg)
    this.updateConversationDirection('Problems')
  }

  askWhichIssue() {
    let msg = this.createChatBotMessage('Please select which category you want to talk about', {
      widget: "TopicOptions"
    })
    this.updateChatbotState(msg)
    this.updateConversationDirection('Problems')
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

  updateEmotion(emotion) {
    this.setState(prevState => ({
      ...prevState, emotion: emotion, messages: [...prevState.messages]
    }))
  }

  updateJournalEntryNumber(number) {
    this.setState(prevState => ({
      ...prevState, journalMessageNumberArray: [...prevState.journalMessageNumberArray, number], messages: [...prevState.messages]
    }))
  }
}


export default ActionProvider;
