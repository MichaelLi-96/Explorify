import { combineReducers } from 'redux';
import SongChangeReducer from './songChangeReducer';
import SongHistoryReducer from './songHistoryReducer';
import SongPressReducer from './songPressReducer';
import AuthReducer from './authReducer';
import CreatePlaylistModalReducer from './createPlaylistModalReducer';

export default combineReducers({
	currentSong: SongChangeReducer,
	songPressed: SongPressReducer,
	songHistory: SongHistoryReducer,
	authDetails: AuthReducer,
	showCreatePlaylistModal: CreatePlaylistModalReducer
});

