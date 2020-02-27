import { combineReducers } from 'redux';
import SongChangeReducer from './songChangeReducer';
import SongPressReducer from './songPressReducer';

export default combineReducers({
	currentSong : SongChangeReducer,
	songPressed : SongPressReducer
});

