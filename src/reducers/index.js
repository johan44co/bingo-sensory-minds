import { combineReducers } from 'redux';
import BingoReducers from './BingoReducers';

export default combineReducers({
    bingo: BingoReducers
});