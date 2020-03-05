import { 
	NEW_SONG_ADDED_TO_HISTORY, 
	PREV_SONG_PRESSED, 
	NEXT_SONG_PRESSED,
	SHUFFLE_PRESSED
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

export const shufflePressed = () => {
	return {
		type: SHUFFLE_PRESSED
	};
}