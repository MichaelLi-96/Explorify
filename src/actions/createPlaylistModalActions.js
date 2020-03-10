import { 
	SHOW_CREATE_PLAYLIST_MODAL_PRESSED,
	HIDE_CREATE_PLAYLIST_MODAL_PRESSED
} from './types';

export const showCreatePlaylistModal = () => {
	return {
		type: SHOW_CREATE_PLAYLIST_MODAL_PRESSED
	};
}

export const hideCreatePlaylistModal = () => {
	return {
		type: HIDE_CREATE_PLAYLIST_MODAL_PRESSED
	};
}