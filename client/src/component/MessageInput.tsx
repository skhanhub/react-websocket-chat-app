import React, { useState, useEffect, useRef } from 'react';

export default function(props: any) {
	
	const [message, setMessage] = useState('')
    const [isTyping, setIsTyping] = useState(false)
	// const messageinput: React.RefObject<HTMLInputElement> = useRef(null);
	
	let typingInterval: any;
	let lastUpdateTime: any;

    useEffect(()=>{
		return () => {
			stopCheckingTyping()
		};    
    }, [])

	const sendMessage = ()=>{
		props.sendMessage(message)
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
		event.preventDefault();
		sendMessage();
		setMessage("");
	}

	const stopCheckingTyping = ()=>{
		console.log("Stop Typing");
		if(typingInterval){
			clearInterval(typingInterval)
			props.sendTyping(false)
		}
	}

	const startCheckingTyping = ()=>{
		console.log("Typing");
		typingInterval =  setInterval(()=>{
			if((Date.now() - lastUpdateTime) > 300){
				setIsTyping(false)
				stopCheckingTyping()
			}
		}, 300)

	}

	const sendTyping = ()=>{
		lastUpdateTime = Date.now()
		if(!isTyping){
			setIsTyping(true)
			props.sendTyping(true)
			startCheckingTyping()
		}
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
		setMessage(event.target.value);
	}
	const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>)=>{
		event.keyCode !== 13 && sendTyping();
	}

	
    return (
        <div className="message-input">
            <form 
                onSubmit={ handleSubmit }
                className="message-form">

                <input 
					id = "message"
					// ref={messageinput}
                    // ref = {"messageinput"}
                    type = "text"
                    className = "form-control"
                    value = { message }
                    autoComplete = {'off'}
                    placeholder = "Type something interesting"
                    onKeyUp = { handleKeyUp }
                    onChange = { handleChange }
				/>
                <button
                    disabled = { message.length < 1 }
                    type = "submit"
                    className = "send"
                > Send </button>
            </form>

        </div>
    );
	
}