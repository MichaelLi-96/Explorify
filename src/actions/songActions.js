import { 
	SONG_CHANGED, 
	SONG_PRESSED, 
	CURRENT_SONG_CLEARED
} from './types';

export const songChange = (songDetails) => {
	return {
		type: SONG_CHANGED,
		payload: songDetails
	};
}

export const songPress = () => {
	return {
		type: SONG_PRESSED
	};
}

export const currentSongCleared = () => {
	return {
		type: CURRENT_SONG_CLEARED
	};
}