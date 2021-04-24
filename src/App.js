import React, {Component} from 'react';
import Chatbot from 'react-chatbot-kit'
import fetchResponseType from './Chatbot/API_Retrieval/fetchResponseType'	
import ChatbotComponent from "./ChatbotComponent";
import WelcomeComponent from "./WelcomeComponent";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
class App extends Component{
	constructor(props){
		super(props);
		fetchResponseType('./determine_friendship_topic', '')
	}



	render(){
		
		return (
			<Router>
			    <div className="Window">
			    	<Switch>
				    	<Route path="/" exact component={WelcomeComponent}/>
				    	<Route path="/chat" component={ChatbotComponent} />
			    	</Switch>
		   		</div>
	   		</Router>
	    
  		);

	}
  	
  
}



export default App;
