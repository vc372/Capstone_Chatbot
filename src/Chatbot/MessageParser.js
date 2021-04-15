// MessageParser starter code

class MessageParser{

  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
    this.currentState = ''
  }

  async parse(message) {
  	// console.log(this.state.webcam.current.getScreenshot())
  	if(this.currentState !== 'issues'){
		await fetch('/process_message?message='+message)
		.then(response => response.json())
		.then(data => this.setCurrentState(data['Response_text']))

		let data = {image: this.state.webcam.current.getScreenshot()}
		await fetch('/process_image', {
			method: 'POST',
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.then(data => console.log(data))
  	}

 	switch(this.currentState){

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

  setCurrentState(state) {
  	this.currentState = state
  }
}

export default MessageParser;

