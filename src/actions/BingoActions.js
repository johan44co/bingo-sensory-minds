import { BINGO_SELECT, BINGO_PLAY_ANIMATION, BINGO_PAUSE_ANIMATION, BINGO_REPLAY_ANIMATION, BINGO_RESET, BINGO_NEW, UPDATE_USERNAME, BINGO_DESELECT } from './types';

export const newBingo = data => dispatch => {
    dispatch({
        type: BINGO_NEW,
        payload: data
    })
}

export const selectBox = data => dispatch => {
    dispatch({
        type: BINGO_SELECT,
        payload: data
    })
}

export const checkBingo = data => dispatch => {
    dispatch({
        type: BINGO_PLAY_ANIMATION,
        payload: data
    })
}

export const pauseAnimation = data => dispatch => {
    dispatch({
        type: BINGO_PAUSE_ANIMATION
    })
}

export const playAnimation = data => dispatch => {
    dispatch({
        type: BINGO_REPLAY_ANIMATION
    })
}

export const resetBoard = data => dispatch => {
    for (let index in data.boxReference.current) {
        let className = data.boxReference.current[index].className
        if (className.includes('--selected')) {
            data.boxReference.current[index].className = className.replace('--selected', '')
        }
    }
    dispatch({
        type: BINGO_RESET
    })
}

export const updateUsername = data => dispatch => {
    dispatch({
        type: UPDATE_USERNAME,
        payload: data
    })
}

export const deselectBox = data => dispatch => {
    dispatch({
        type: BINGO_DESELECT,
        payload: data
    })
}