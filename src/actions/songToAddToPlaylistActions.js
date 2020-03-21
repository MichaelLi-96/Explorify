import { 
	STORING_SONG_TO_BE_ADDED_TO_PLAYLIST, 
	REMOVING_SONG_TO_BE_ADDED_TO_PLAYLIST, 
	SONG_TO_BE_ADDED_TO_PLAYLIST_CLEARED
} from './types';

export const storeSongToBeAddedToPlaylist = (song) => {
	return {
		type: STORING_SONG_TO_BE_ADDED_TO_PLAYLIST,
		payload: song
	};
}

export const removeSongToBeAddedToPlaylist = () => {
	return {
		type: REMOVING_SONG_TO_BE_ADDED_TO_PLAYLIST
	};
}

export const songToBeAddedToPlaylistCleared = () => {
	return {
		type: SONG_TO_BE_ADDED_TO_PLAYLIST_CLEARED
	};
}