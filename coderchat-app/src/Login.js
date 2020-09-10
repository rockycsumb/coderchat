import React from 'react';
import {Button} from '@material-ui/core';
import './Login.css';
import Register from './Register';
import {auth, provider} from "./firebase";
import {useStateValue} from "./StateProvider";
import {actionTypes} from "./reducer";

function Login(){
	const [{}, dispatch] = useStateValue();
	const signIn = () => {
		auth
			.signInWithPopup(provider)
			.then(result => {
			dispatch({
				type: actionTypes.SET_USER,
				user: result.user
			});
		})
			.catch(error=>alert(error.message));
	};
	
	const signInDemo = () => {
		auth
		 	 .signInWithEmailAndPassword("demo@coderchat.com", "demouser")
			 .then((user) => {
			   dispatch({
				   type: actionTypes.SET_USER,
				   user: user.user
			   })
			 })
			 .catch((error) => {
			   console.log(error);
			 });
	};
	
	return(
		<div className='login'>
			<div className="login_container">
				<h1>login</h1>
					<img 
						src={require("./assets/whatsapp.png")}
						alt=""
						/>
					<div className="login_text">
						<h1>Sign in to CoderChat</h1>
					</div>
					<div className="login_buttons">
						<Button onClick={signIn}>
							Sign In With Google
						</Button>
						<Button onClick={signInDemo}>
							DEMO
						</Button>
					</div>
			</div>
			
		</div>
	)
}
export default Login;