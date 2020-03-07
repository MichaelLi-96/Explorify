import { NEW_SONG_ADDED_TO_HISTORY, 
		PREV_SONG_PRESSED, 
		NEXT_SONG_PRESSED, 
		SHUFFLE_PRESSED } from '../actions/types';

const INITIAL_STATE = { 
	songHistoryPlaylist: [],
	currentSongHistoryIndex: -1,
	currentSongHistoryLength: 0,
	currentSongId: ''
};

const songHistoryReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case NEW_SONG_ADDED_TO_HISTORY:
			const newSongHistoryPlaylist = state.songHistoryPlaylist;
			newSongHistoryPlaylist.push(action.payload);
			return { 
				songHistoryPlaylist: newSongHistoryPlaylist,
				currentSongHistoryIndex: state.currentSongHistoryIndex + 1,
				currentSongHistoryLength: state.currentSongHistoryLength + 1,
				currentSongId: action.payload._id
			};
		case PREV_SONG_PRESSED:
			return { 
				...state, 
				currentSongHistoryIndex: state.currentSongHistoryIndex - 1
			};
		case NEXT_SONG_PRESSED:
			return { 
				...state, 
				currentSongHistoryIndex: state.currentSongHistoryIndex + 1
			};
		case SHUFFLE_PRESSED:
		default:
			return state;
	}
}

export default songHistoryReducer;
