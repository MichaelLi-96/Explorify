import { combineReducers } from 'redux';
import SongChangeReducer from './songChangeReducer';
import SongHistoryReducer from './songHistoryReducer';
import SongPressReducer from './songPressReducer';
import AuthReducer from './authReducer';

export default combineReducers({
	currentSong: SongChangeReducer,
	songPressed: SongPressReducer,
	songHistory: SongHistoryReducer,
	auth: AuthReducer
});

