import React, {useEffect, useState} from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import {useParams} from 'react-router-dom';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Chat.css';
import db from "./firebase";
import firebase from 'firebase';
import {useStateValue} from "./StateProvider";
import 'emoji-mart/css/emoji-mart.css';
import {Picker} from "emoji-mart";
import Popover from '@material-ui/core/Popover';


function Chat() {
	const [seed, setSeed] = useState('');
	const [input, setInput] = useState('');
	const {roomId} = useParams();
	const [roomName, setRoomName] = useState("");
	const [messages, setMessages] = useState([]);
	const [{user}, dispatch] = useStateValue();
	const[anchorEl, setAnchorEl] = useState(null);
	
	const scrollFunction2 =()=>{
        let e = document.getElementById("el1");
        // This ends the block to the window 
        // bottom and also aligns the view to the center 
        e.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
          inline: 'end'
        });
      }
	
	useEffect(()=>{
		if(roomId){
			db.collection("rooms")
				.doc(roomId)
				.onSnapshot(snapshot => setRoomName(snapshot.data().name));
			
			db.collection("rooms")
				.doc(roomId)
				.collection("messages")
				.orderBy('timestamp', 'asc')
				.onSnapshot(snapshot => {
				setMessages(snapshot.docs.map(doc => doc.data()))
				scrollFunction2();
			}
			);
		}
		
		
	}, [roomId])
	
	useEffect(()=>{
		setSeed(Math.floor(Math.random() * 5000));
		
	},[roomId])
	
	const handleEmojiPopup = (event) =>{
		setAnchorEl(event.currentTarget);
		
	}
	
	const handleClose = () =>{
		setAnchorEl(null);
	}
	
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	
	const sendMessage = (e) =>{
		e.preventDefault();
		
		db.collection('rooms').doc(roomId).collection('messages').add({
			message: input,
			name: user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		})
		setInput('');
	}
	
	const insertEmoji = (emoji) =>{
		setInput(input + emoji.native);
		handleClose();
	}
	
	return(
		<div className="chat">
	
			<div className="chat_header">
				<Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
				<div className="chat_headerInfo">
					<h3>{roomName}</h3>
					{messages.length > 0 ? (
						<p>Last seen {" "}
							{new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}
						</p>
					):(
						" ")
					}
					
				</div>
			</div>
			
			<div className="chat_header_mobile">
				
				<Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
				
				<div >
					<h6>{roomName}</h6>
				</div>
			</div>
			
			<div className="chat_body">
				{/*<p className={`chat_message ${message.name === user.displayName && "chat_receiver"}`}> */}
				{/*<p className="chat_message chat_receiver">*/}
				{messages.map(message =>(
			    
				<p className={`chat_message ${message.name === user.displayName && "chat_receiver"}`}>
					<span className="chat_name">
						{message.name}
					</span>
					{message.message}
					<span className="chat_timestamp">
						{new Date(message.timestamp?.toDate()).toUTCString()}
					</span>
				</p>
				))}
				<br /><br />				
				<div id="el1" />
			</div>
			
			<div className="chat_footer">
				
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
				<Picker onSelect={insertEmoji} />
			</Popover>
			
			
			<InsertEmoticonIcon  onClick={handleEmojiPopup} />
				<form>
					<input 
						placeholder="Type a message"
						type="text"
						value={input}
						onChange={e => setInput(e.target.value)}
					/>
					<button
						type="submit"
						onClick={sendMessage}
						>
						Send a Message
					</button>
				</form>
			</div>
		</div>
	)
}

export default Chat;