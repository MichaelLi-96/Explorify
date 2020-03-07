import { 
	NEW_SONG_ADDED_TO_HISTORY, 
	PREV_SONG_PRESSED, 
	NEXT_SONG_PRESSED,
	SINGLE_SONG_PLAYED,
	PLAYLIST_ALBUM_PLAYED,
	SHUFFLE_PRESSED,
	UNSHUFFLE_PRESSED
} from './types';

export const newSongAddedToHistory = (songDetails) => {
	return {
		type: NEW_SONG_ADDED_TO_HISTORY,
		payload: songDetails
	};
}

export const prevSongPressed = () => {
	return {
		type: PREV_SONG_PRESSED
	};
}

export const nextSongPressed = () => {
	return {
		type: NEXT_SONG_PRESSED
	};
}

export const singleSongPlayed = () => {
	return {
		type: SINGLE_SONG_PLAYED
	};
}

export const playlistAlbumPlayed = (songs) => {
	return {
		type: PLAYLIST_ALBUM_PLAYED,
		payload: songs
	};
}

export const shufflePressed = () => {
	return {
		type: SHUFFLE_PRESSED
	};
}

export const unshufflePressed = () => {
	return {
		type: UNSHUFFLE_PRESSED
	};
}