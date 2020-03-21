import { SONG_CHANGED, CURRENT_SONG_CLEARED } from '../actions/types';

const INITIAL_STATE = { 
	name: '',
	albumPlaylist: {},
	artist: {},
	url: '',
	imageUrl: '',
	length: '',
	plays: 0
};

const songChangeReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SONG_CHANGED:
			return { 
				name: action.payload.name, 
				albumPlaylist: action.payload.albumPlaylist,
				artist: action.payload.artist,
				url: action.payload.url, 
				imageUrl: action.payload.imageUrl, 
				length: action.payload.length, 
				plays: action.payload.plays 
			};
		case CURRENT_SONG_CLEARED:
			return INITIAL_STATE;
		default:
			return state;
	}
}

export default songChangeReducer;
