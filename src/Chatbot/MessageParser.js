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
  	
    if(this.state.topic === 'Problems'){
        
        switch(this.state.issue) {
            case 'relationships':
            var subIssue = await fetchResponseType('/determine_relationship_type', message)
            var cause = await fetchResponseType('/determine_friendship_topic', message)
            // let cause = await fetchResponseType('./determine_'+subIssue+'_cause', message)
            console.log('Sub Issue: ' + subIssue)
            console.log('Cause: ' + cause)
            this.actionProvider.provideRelationshipResources(subIssue, cause)
            break;

            case 'self-esteem':
            var subIssue = await fetchResponseType('/determine_self-esteem_type', message)
            var cause = await fetchResponseType('/determine_friendship_topic', message)
            this.actionProvider.provideSelfEsteemResources()
            break;

            case 'anxiety':
            var subIssue = await fetchResponseType('/determine_anxiety_type', message)
            var cause = await fetchResponseType('/determine_friendship_topic', message)
            this.actionProvider.provideAnxietyResources()
            break;

            default:
            let issue = 'relationships' //await fetchResponseType('./determine_issue', message)
            this.actionProvider.askConfirmation(issue)
        }
       
    } else {
        
        let currentResponseType = await fetchResponseType('/process_message', message)
        this.setTopic(currentResponseType)

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

 }
}

export default MessageParser;

