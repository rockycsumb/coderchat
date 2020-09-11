import React, {useState, useEffect} from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import PublicIcon from '@material-ui/icons/Public';
import ChatIcon from '@material-ui/icons/Chat';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { SearchOutlined } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import SidebarChat from './SidebarChat';
import db from "./firebase";
import {useStateValue} from "./StateProvider";
import {auth} from "./firebase";
import {actionTypes} from "./reducer";
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import './Sidebar.css';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Sidebar() {
	const [rooms, setRooms] = useState([]);
	const[{user}, dispatch] = useStateValue();
	const[anchorEl, setAnchorEl] = useState(null);
	const[searching, setSearching] = useState(false);
	const[search, setSearch] = useState("");
	const classes = useStyles();
	const demoURL = require("./assets/demo.png");
	
	useEffect(()=>{
		const unsubscribe = db.collection("rooms").onSnapshot(snapshot=>(
		setRooms(snapshot.docs.map(doc =>
			({
				id: doc.id,
				data: doc.data()
			})
			))
		))
		return ()=>{
			unsubscribe();
		}
	},[])
	
	const handleRoomPopup = (event) =>{
		setAnchorEl(event.currentTarget);
	}
	
	const handleClose = () =>{
		setAnchorEl(null);
	}
	
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	
	const handleLogout = () =>{
		auth
			.signOut()
			.then((result)=>{
			dispatch({
				type: actionTypes.SET_USER,
				user: null
			})
			
		}).catch((error)=>{
			console.log(error);
		})
	}
	
	const onChange = e =>{
		setSearching(true);
		setSearch(e.target.value);
	}
	
	const handleStopSearch = () =>{
		setSearching(false);
	}
	
	
	return (
		<div className="sidebar">
			<div className="sidebar_header">
				<Avatar src={user.email === "demo@coderchat.com" ? demoURL : user.photoURL}/>
				<div className="sidebar_headerRight">				
					 <Button
						color="default"
						startIcon={<PublicIcon />}
						className="sidebar_rooms"
						onClick={handleRoomPopup}
					  >
						Rooms
					</Button>
					
					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
						  vertical: 'bottom',
						  horizontal: 'center',
						}}
						transformOrigin={{
						  vertical: 'top',
						  horizontal: 'center',
						}}
					>
						<div className="sidebar_chats_popup" onClick={handleClose}>
							<SidebarChat addNewChat />
							{rooms.map(room =>(
								<SidebarChat 
									key={room.id} 
									id={room.id} 
									name={room.data.name}
									/>
							))}
						</div>
					</Popover>
					 <Button
						color="default"
						startIcon={<ExitToAppIcon />}
						onClick={handleLogout}
					  >
						Logout
					</Button>
					
				</div>
			</div>

			<div className="sidebar_search">
				<div className="sidebar_searchContainer">
					{searching ? (
						<CloseIcon  onClick={handleStopSearch}/>
					):(
						<SearchOutlined />
					)}
					
					<input 
						placeholder="Search or start new Chat"
						name="search"
						type="text"
						
						onChange={e=>onChange(e)}	
					/>
				</div>	
			</div>
			{searching ? (
				<div className="sidebar_chats">
				<SidebarChat addNewChat />
					{rooms.map(room => room.data.name === search && 
						<SidebarChat 
							key={room.id} 
							id={room.id} 
							name={room.data.name} 
							/>
					)}
				</div>
			):(
				
				<div className="sidebar_chats">
				<SidebarChat addNewChat />
					{rooms.map(room =>(
						<SidebarChat 
							key={room.id} 
							id={room.id} 
							name={room.data.name} 
							/>
					))}
				</div>
			)}
			
		</div>
	)
}

export default Sidebar;
