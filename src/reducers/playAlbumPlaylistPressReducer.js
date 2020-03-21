import { PLAY_ALBUM_PLAYLIST_PRESSED } from '../actions/types';

const playAlbumPlaylistPressReducer = (state = false, action) => {
	switch (action.type) {
		case PLAY_ALBUM_PLAYLIST_PRESSED:
			return !state;
		default:
			return state;
	}
}

export default playAlbumPlaylistPressReducer;

