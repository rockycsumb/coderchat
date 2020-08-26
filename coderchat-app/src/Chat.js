import React, {useEffect, useState} from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Chat.css';

function Chat() {
	const [seed, setSeed] = useState('');
	
	useEffect(()=>{
		setSeed(Math.floor(Math.random() * 5000));
		
	},[])
	
	return(
		<div className="chat">
			{/*SM COMMENT */}
		
			<div className="chat_header">
				<Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
				
				<div className="chat_headerInfo">
					<h3>Room Name</h3>
					<p>Last seen at...</p>
				</div>
				
				<div className="chat_headerRight">
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			
			<div className="chat_body">
			
			</div>
			
			<div className="chat_footer">
			
			</div>
		</div>
	)
}

export default Chat;