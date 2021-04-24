import React, {Component} from 'react';
import Chatbot from 'react-chatbot-kit'
import './App.css';
import fetchResponseType from './Chatbot/API_Retrieval/fetchResponseType'	
import ChatbotComponent from "./ChatbotComponent";
import { Animate, AnimateKeyframes}  from 'react-simple-animate';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import logo_cropped from './Chatbot/Images/logo_cropped.png'
import MuiTextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
class WelcomeComponent extends Component{
	constructor(props){
		super(props);
		this.state = {name: ''}
	}

	// static propTypes = {
	//     match: PropTypes.object.isRequired,
	//     location: PropTypes.object.isRequired,
	//     history: PropTypes.object.isRequired
 //  	};

	handleSubmit = (event) =>{
		event.preventDefault();
		console.log(event)
		this.props.history.push({pathname:'/chat',
								 name: this.state.name,
								});
	}

	handleInput = (event) => {
		this.setState({name: event.target.value})
	}

	render(){
		
		return (
		    <div className="WelcomeWindow">
		    	<AnimateKeyframes
		    		play={true}
		    		duration={3}
		    		iterationCount="infinite"
		    		easeType={'ease-in-out'}
			    	keyframes={[
			    		"transform: translateY(0)",
    					"transform: translateY(-30px)",
    					"transform: translateY(0)"   
			    	]}
				>
		    		<img id='logo_cropped' src={logo_cropped} alt="Logo"/>
		    	</AnimateKeyframes>
		    	<ThemeProvider theme={theme}>
			    	<form autoComplete="off" onSubmit={this.handleSubmit}>
			    		<MuiTextField inputProps={inputProps} id="standard-basic" onInput={this.handleInput}/>
			    	</form>
			    </ThemeProvider>
	   		</div>
	    
  		);

	}
  	
  
}



const inputProps = {
  		style: {
  			fontSize: 50,
  			color:'white',
  			textAlign: 'center',
  		}, 
  		autoFocus: true,
  		placeholder:'What would you liked to be called?',
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1565c0',
    },
    secondary: {
      main: '#2196f3',
    },
  },
 
});


export default WelcomeComponent;