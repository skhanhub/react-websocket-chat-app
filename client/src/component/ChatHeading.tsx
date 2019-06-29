import React from 'react';
import { FaVideo, FaUserPlus,  FaEllipsisH } from "react-icons/fa";

export default function(props: any) {
	const {name, numberOfUsers} = props;
	return (
		<div className="chat-header">
			<div className="user-info">
				<div className="user-name">{name}</div>
				<div className="status">
					<div className="indicator"></div>
					<span>{numberOfUsers && numberOfUsers}</span>
				</div>
			</div>
			<div className="options">
				<FaVideo />
				<FaUserPlus />
				<FaEllipsisH />
			</div>
		</div>
	);
	
}