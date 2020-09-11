import React from 'react';

const Profile = () =>{
	
	return (
		<div className={toggle ? "Navbar-popup-menu" : "Navbar-popup-menu Navbar-popup-menu-off"} >
			<div className="d-flex justify-content-end mr-3 mt-3">
				<div className={toggle ? "Navbar-close-toggler-spin" : ""} onClick={toggler} >
					<FontAwesomeIcon icon={faTimes} />
				</div>
			</div>
			<div className="d-flex justify-content-center Navbar-links-popup-menu">
				<div className="d-flex flex-column align-items-center justify-content-center">
					<h1>Profile</h1>
				</div>
			</div>
		</div>	
	)
}
export default Profile;

			