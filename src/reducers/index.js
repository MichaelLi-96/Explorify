import { combineReducers } from 'redux';
import ChangeSongReducer from './changeSongReducer';

export default combineReducers({
	currentSong : ChangeSongReducer
});

