import { SHOW_CREATE_PLAYLIST_MODAL_PRESSED, HIDE_CREATE_PLAYLIST_MODAL_PRESSED } from '../actions/types';

const createPlaylistModalReducer = (state = false, action) => {
	switch (action.type) {
		case SHOW_CREATE_PLAYLIST_MODAL_PRESSED:
			return !state;
		case HIDE_CREATE_PLAYLIST_MODAL_PRESSED:
			return !state;
		default:
			return state;
	}
}

export default createPlaylistModalReducer;

