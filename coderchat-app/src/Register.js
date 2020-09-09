import React, {useState} from 'react';

function Regsiter(){
	const [formData, setFormData] = useState({
		email: "",
		pass: ""
	})
	
	const onChange = e => {
		setFormData({...formData, [e.target.name]: e.target.value});
	}
	
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
		</div>
	)
}

export default Register;
