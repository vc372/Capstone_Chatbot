import React, {Component} from 'react';
import Chatbot from 'react-chatbot-kit'
import './App.css';
import config from './Chatbot/config'
import MessageParser from './Chatbot/MessageParser'
import ActionProvider from './Chatbot/ActionProvider'
import Webcam from "react-webcam";	
import fetchResponseType from './Chatbot/API_Retrieval/fetchResponseType'	
import SplitPane from "react-split-pane"
import './CustomComponentStyle.css'
class App extends Component{
	constructor(props){
		super(props);
		this.name = this.props.location.name
		this.webcamRef = React.createRef()
	}
	
	render(){
		return (
		    <div className="Chatframe">
		    	<SplitPane split='vertical' minSize={50} defaultSize={300}>
		    		<div id='WebCamFrame'>
			  			<Webcam 
			  			id='webcam'
			      		mirrored={true}
			      		ref={this.webcamRef} 
			      		/>
			      		<div id='name'><h2>{this.name}</h2></div>
		      		</div>
		      		<div>
			      		<Chatbot 
				        	config={config(this.webcamRef, this.name)}
				        	messageParser={MessageParser}
				        	actionProvider={ActionProvider}
			      		/>
		      		</div>
		     	 </SplitPane>   
	   		 </div>
	    
  		);

	}
  	
  
}

export default App;