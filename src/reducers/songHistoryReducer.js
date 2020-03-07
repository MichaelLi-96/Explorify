import { NEW_SONG_ADDED_TO_HISTORY, 
		PREV_SONG_PRESSED, 
		NEXT_SONG_PRESSED, 
		SINGLE_SONG_PLAYED,
		PLAYLIST_ALBUM_PLAYED,
		SHUFFLE_PRESSED } from '../actions/types';

const INITIAL_STATE = { 
	songHistoryPlaylist: [],
	currentSongHistoryIndex: -1,
	currentSongHistoryLength: 0,
	currentSongId: '',
	isPlayingAlbumPlaylist: false
};

const songHistoryReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case NEW_SONG_ADDED_TO_HISTORY:
			const newSongHistoryPlaylist = state.songHistoryPlaylist;
			newSongHistoryPlaylist.push(action.payload);
			return { 
				...state,
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
		case SINGLE_SONG_PLAYED:
			return {
				...INITIAL_STATE, 
				songHistoryPlaylist: [],
				isPlayingAlbumPlaylist: false
			}
		case PLAYLIST_ALBUM_PLAYED:
			return {
				songHistoryPlaylist: action.payload,
				currentSongHistoryIndex: 0,
				currentSongHistoryLength: action.payload.length,
				currentSongId: action.payload[0]._id,
				isPlayingAlbumPlaylist: true
			}
		case SHUFFLE_PRESSED:
			return {
				
			}
		default:
			return state;
	}
}

export default songHistoryReducer;
