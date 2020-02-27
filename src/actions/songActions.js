import { 
	SONG_CHANGED, 
	SONG_PRESSED, 
} from './types';

export const songChange = (songDetails) => {
	return {
		type: 'SONG_CHANGED',
		payload: songDetails
	};
}

export const songPress = () => {
	return {
		type: 'SONG_PRESSED'
	};
}