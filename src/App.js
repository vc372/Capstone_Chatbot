import React, {useState, useEffect, useRef, Component} from 'react';
import Chatbot from 'react-chatbot-kit'
import './App.css';
import config from './Chatbot/config'
import MessageParser from './Chatbot/MessageParser'
import ActionProvider from './Chatbot/ActionProvider'
import Webcam from "react-webcam";	
import fetchResponseType from './Chatbot/API_Retrieval/fetchResponseType'	
import SplitPane from "react-split-pane"

class App extends Component{
	constructor(props){
		super(props);
		this.webcamRef = React.createRef()
		fetchResponseType('./determine_friendship_topic', '')
	}
	// const webcamRef = useRef()

	// useEffect(() =>{
	// 	console.log(webcamRef.current)
	// })

	
	componentDidMount(){
		console.log('mounted')
		console.log(this.webcamRef)
	}
	render(){

		return (
		    <div className="Chatframe">
		    	<SplitPane split='vertical' minSize={50} defaultSize={100}>
		    		<div id='WebCamFrame'>
			  			<Webcam 
			  			id='webcam'
			      		mirrored={true}
			      		ref={this.webcamRef} 
			      		/>
		      		</div>
		      		<Chatbot 
		        	config={config(this.webcamRef)}
		        	messageParser={MessageParser}
		        	actionProvider={ActionProvider}
		      		/>
			   
		      </SplitPane>
		      
	    </div>
	    
  		);

	}
  	
  
}

export default App;
