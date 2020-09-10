import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import {auth} from "./firebase";
import {useStateValue} from "./StateProvider";
import {actionTypes} from "./reducer";

function Register(){
	const [{}, dispatch] = useStateValue();
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	})
	
	const {
		email,
		password
	} = formData;
	
	const onChange = e => {
		setFormData({...formData, [e.target.name]: e.target.value});
	}
	
	const handleSubmit = e => {
		console.log("submit")
		e.preventDefault();
		// auth
		// 	.createUserWithEmailAndPassword(email, password)
		// 	.then((user)=>{
		// 		console.log(user);
		// 	})
		// 	.catch((error)=>{
		// 		console.log(error);
		// 	});
		
	};
	
	return(
		<div>
			<input 
				type="text"
				name="email"
				value={email}
				placeholder="Email"
				onChange={e => onChange(e)}
			/>
			
			<input 
				type="text"
				name="password"
				value={password}
				placeholder="Password"
				onChange={e => onChange(e)}
			/>
			
			<Button onClick={handleSubmit} >
				Sign In
			</Button>
		</div>
		
	)
}

export default Register;
