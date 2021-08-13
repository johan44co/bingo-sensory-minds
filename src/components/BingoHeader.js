import React, { useState } from 'react';
import { resetBoard, updateUsername } from '../actions/BingoActions';
import { useSelector, useDispatch } from 'react-redux';
import resetIcon from '../assets/images/svg/reset.svg';

function BingoHeader(props) {

    const bingoStore = useSelector(data => data.bingo);
    const dispatch = useDispatch();
    
    const [toggle, setToggle] = useState(true)
    const [username, setUsername] = useState(bingoStore.username)
    const score = bingoStore.bingos.length

    const updateUsernameState = (e) => {
        let newUsername = e.target.value.replace(/[^a-zA-Z0-9]/g,'')
        if (username.length <= 10) {
            setUsername(newUsername)
        }
    }

    const submitUsername = (e) => {
        if (e.key === 'Enter' || e.type === 'blur') {
            if (username !== '' &&  username.length <= 10) {
                setToggle(true)
                dispatch(updateUsername({username: username}))
            }
        }
      }

    return (
        <div className="board__header">
            <div className="board__header__screen">
                <div className="board__header__screen__name">
                    <span>username</span>
                    {toggle ? 
                        <p onClick={() => setToggle(false)}>{username}</p> :
                        <input autoFocus maxLength="10" onBlur={submitUsername} onKeyDown={submitUsername} type='text' onChange={updateUsernameState} value={username} textarea={'username'} />
                    }
                    
                </div>
                <div className="board__header__screen__score">
                    <span>score</span>
                    <p>{score}</p>
                </div>

            </div>
            <div className="board__header__reset" onClick={() => dispatch(resetBoard({ boxReference: props.boxReference }))}>
                <img width='30px'  alt='reset' src={resetIcon}></img>
            </div>
        </div>
    );
}

export default BingoHeader;