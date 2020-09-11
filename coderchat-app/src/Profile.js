import React, {useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
import './Profile.css';

const Profile = () =>{
	const [toggle, setToggle] = useState(false);
	const toggler = () =>{
		setToggle(!toggle);
		console.log("popup", toggle)
	}
	return (
		<div className="Profile-container">
		<div className={toggle ? "Navbar-popup-menu" : "Navbar-popup-menu Navbar-popup-menu-off"} >
			<div className="d-flex justify-content-end mr-3 mt-3 border-2 border-danger">
				<div className={toggle ? "Navbar-close-toggler-spin" : ""} onClick={toggler} > button
					<AddIcon />
				</div>
			</div>
			<div className="d-flex justify-content-center Navbar-links-popup-menu">
				<div className="d-flex flex-column align-items-center justify-content-center">
					<h1>Profile</h1>
				</div>
			</div>
		</div>	
			</div>
	)
}
export default Profile;

			