import React, { useRef, useEffect } from 'react';
import {Message} from './ChatContainer';

export default function(props: any) {

	const { messages, user, typingUsers } = props
	const containerEl: React.RefObject<HTMLDivElement> = useRef(null);

	const scrollDown = ()=>{
		containerEl.current!.scrollTop = containerEl.current!.scrollHeight;
	}

	useEffect(()=>{
		scrollDown()
	})

	return (
		<div ref={containerEl}
			className="thread-container">
			<div className="thread">
				{
					messages.map((mes: Message)=>{
						console.log({mes})
						return (
							<div
								key={mes.id}
								className={`message-container ${mes.sender === user.name && 'right'}`}
							>
								<div className="time">{mes.time}</div>
								<div className="data">
									<div className="message">{mes.message}</div>
									<div className="name">{mes.sender}</div>
								</div>
							</div>

							)
					})
				}
				{
					typingUsers.map((name: string)=>{
						return (
							<div key={name} className="typing-user">
								{`${name} is typing . . .`}
							</div>
						)
					})
				}
			</div>
		</div>
	);
}