import { SONG_CHANGED } from './types';

export const changeSong = (songDetails) => {
	return {
		type: 'SONG_CHANGED',
		payload: songDetails
	};
}