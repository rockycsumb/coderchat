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
			console.log("from login", result);
			dispatch({
				type: actionTypes.SET_USER,
				user: result.user
			});
		})
			.catch(error=>alert(error.message));
	};
	
	const signInUserPass = () => {
		console.log("sign in wih user and pass")
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

					<Button onClick={signIn}>
						Sign In With Google
					</Button>
					<div>
						<Register />
					</div>
			</div>
		</div>
	)
}
export default Login;