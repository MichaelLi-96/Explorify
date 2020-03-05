import { combineReducers } from 'redux';
import SongChangeReducer from './songChangeReducer';
import SongHistory from './songHistoryReducer';
import SongPressReducer from './songPressReducer';

export default combineReducers({
	currentSong: SongChangeReducer,
	songPressed: SongPressReducer,
	songHistory: SongHistory
});

