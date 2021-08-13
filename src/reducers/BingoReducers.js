import { BINGO_SELECT, BINGO_PLAY_ANIMATION, BINGO_PAUSE_ANIMATION, BINGO_REPLAY_ANIMATION, BINGO_RESET, BINGO_NEW, UPDATE_USERNAME, BINGO_DESELECT } from '../actions/types';
// import { bingo } from '../actions/BingoActions';
// import { useDispatch } from 'react-redux';
// const dispatch = useDispatch()
import io from 'socket.io-client';

const initialState = {
    phrases: [
        "Hello, are you there?",
        "We can see you", 
        "We can't hear you.",
        "You're on mute!",
        "Can you unmute your mic?",
        "Could you turn your video on?",
        "Can you hear me now?",
        "Can you see me now?",
        "Would you mind muting",
        "We can hear the dog barking",
        "Sorry, I didn't catch that",
        "The connection is bad",
        "Could you repeat that",
        "You're breaking up a bit",
        "You've frozen",
        "We've lost you!",
        "Could you write it in chat?",
        "You can leave now",
        "He/She is not joining today",
        "I will share my screen",
        "See you tomorrow",
        "I will be back",
        "He/She will be late today",
        "Sorry, I'm back",
        "Good morning everyone"
      ].sort(() => Math.random() - 0.5),
    selectedPhrases: [12],
    bingos: [],
    options: [
        //horizontal
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        //vertical
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        //diagonal
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20]
    ],
    playAnimation: false,
    animationsQueue: [],
    animationKey: 0,
    socket: io('bingo.dubetto.com'),
    username: localStorage.getItem('username') !== null ? localStorage.getItem('username') : `user${new Date().getMilliseconds()}` ,
    bingosNET: []
}

const setAnimation = (state, animationType) => {
    state.playAnimation = true
    state.animationsQueue.shift()
    state.animationsQueue.push(animationType)
    state.animationKey = new Date().getTime()
    state.socket.emit('bingo', {
        username: state.username,
        bingo: animationType        
    }) 
}

const cleanAnimation = (state) => {
    state.playAnimation = false
    state.animationsQueue.shift()
}

export default function BingoReducer(state = initialState, action) {
    switch (action.type) {
        case BINGO_SELECT:
            state.selectedPhrases.push(action.payload.selectedPhrase)

            for (let option of state.options) {
                let verifier = option.filter(x => state.selectedPhrases.includes(x))
                if (verifier.length === 5 && !state.bingos.includes(verifier.join(''))) {
                    state.bingos.push(verifier.join(''))
                }
            }

            return {...state}
        case BINGO_PLAY_ANIMATION:
            if (state.bingos.length > action.payload.currentBingos) {
                if (state.bingos.length !== 12) {
                  switch (state.bingos.length - action.payload.currentBingos) {
                    case 3:
                        setAnimation(state, 3)
                      break;
                    case 2:
                        setAnimation(state, 2)
                      break;
                    default:
                        setAnimation(state, 1)
                      break;
                  }
                } else {
                    setAnimation(state, 4)
                }
              }
            return {...state}
        case BINGO_PAUSE_ANIMATION:
            cleanAnimation(state)
            return {...state}
        case BINGO_REPLAY_ANIMATION:
            if (state.selectedPhrases.length === 1 && state.bingos.length === 0) {
                state.playAnimation = false
            } else {
                state.playAnimation = true
                state.animationKey = new Date().getTime()
            }
            return {...state}
        case BINGO_RESET:
            state.phrases = [...state.phrases].sort(() => Math.random() - 0.5)
            state.selectedPhrases = [12]
            state.bingos = []
            // if (state.animationsQueue[0] === 4) {cleanAnimation(state)}
            // state.animationsQueue.shift()
            // state.animationsQueue = []
            return {...state}
        case UPDATE_USERNAME:
            state.username = action.payload.username
            localStorage.setItem('username', action.payload.username)
            return {...state}
        case BINGO_NEW:
            state.bingosNET.push(action.payload)
            return {...state}
        case BINGO_DESELECT:
            let index = state.selectedPhrases.indexOf(action.payload.selectedPhrase);
            if (index !== -1) {
                state.selectedPhrases.splice(index, 1);
            }
            return {...state}
        default:
            return state
    }

}