import { combineReducers } from 'redux';
import SongChangeReducer from './songChangeReducer';
import songHistoryReducer from './songHistoryReducer';
import SongPressReducer from './songPressReducer';

export default combineReducers({
	currentSong: SongChangeReducer,
	songPressed: SongPressReducer,
	songHistory: songHistoryReducer
});

