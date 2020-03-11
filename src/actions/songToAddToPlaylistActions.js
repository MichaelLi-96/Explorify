import { 
	STORING_SONG_TO_BE_ADDED_TO_PLAYLIST, 
	REMOVING_SONG_TO_BE_ADDED_TO_PLAYLIST, 
} from './types';

export const storeSongToBeAddedToPlaylist = (song) => {
	return {
		type: STORING_SONG_TO_BE_ADDED_TO_PLAYLIST,
		payload: song
	};
}

export const removeSongToBeAddedToPlaylist = (song) => {
	return {
		type: REMOVING_SONG_TO_BE_ADDED_TO_PLAYLIST,
		payload: song
	};
}