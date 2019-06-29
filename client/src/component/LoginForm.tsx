import React, { useState, useRef } from 'react';
import constants from '../constants'


function LoginForm(props: any) {
    const {socket} = props;
    const [nickname, setNickname] = useState('')
    const [error, setError] = useState<null | string>(null)

    const inputEl: React.RefObject<HTMLInputElement> = useRef(null);

     
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        socket.emit(constants.VERIFY_USER, nickname, (data: any) => {

            if(data.isUser){
                setError("Username taken!");         
            }
            else{
                setError(null); 
                props.setUser(data.user);              
            }
        });
    }

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setNickname(inputEl.current!.value)
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor="nickname">
                    <h2>Got a nickname?</h2>
                </label>
                <input 
                    type="text"
                    ref={inputEl}
                    id='nickname'
                    value={nickname}
                    onChange={handleChange}
                    placeholder="Cool Username"
                />
                <div className="error">{error && error}</div>
            </form>
        </div>
    );
}

export default LoginForm;
