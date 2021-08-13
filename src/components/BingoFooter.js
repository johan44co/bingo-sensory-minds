import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
const { DateTime } = require("luxon");

function BingoFooter() {
    const bingoStore = useSelector(data => data.bingo);
    const lastBingo = bingoStore.bingosNET.length > 0 ? bingoStore.bingosNET[bingoStore.bingosNET.length - 1] : {}
    lastBingo.username = lastBingo.username === bingoStore.username ? 'you' : lastBingo.username
    const initKey = new Date()
    const [key, setKey] = useState(initKey)

    const tick = () => {
        setKey(new Date())
    }

    useEffect(() => {
        const keyID = setInterval(() => tick(), 10000)
        return () => {
            clearInterval(keyID)
        }
    }, [])

    const timeAgo = (date) => {
        const now = DateTime.local();
        const past = DateTime.fromJSDate(date);
        const diff = now.diff(past, ['minutes']);
        const minutes = Math.floor(diff.minutes) 
        return minutes >= 1 ? 
        minutes === 1 ? `${Math.floor(diff.minutes)} minute ago` : `${Math.floor(diff.minutes)} minutes ago`
        : `Just now`;
    }

    const bingoType = (type) => {
        switch (type) {
            case 2:
                type = 'double bingo'
                break;
            case 3:
                type = 'triple bingo'
                break;
            case 4:
                type = 'full bingo'
                break;
            default:
                type = '1 row'
                break;
        }
        return type
    }

    return (
        <div key={key.getTime()} className="board__footer">
            <div className="board__footer__screen">
                <div className="board__footer__screen__bingo">
                    <span>Last Bingo</span>
                    <span>{lastBingo.time ? timeAgo(new Date(lastBingo.time)) : 'no bingos yet'}</span>
                    <div className="board__footer__screen__bingo__wrap">
                    {[ ...new Array(4)].map((value, index) => {
                        return <p key={index}>{lastBingo.username ? `${bingoType(lastBingo.bingo)} BY ${lastBingo.username} ·` : 'waiting ·'}</p>
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BingoFooter