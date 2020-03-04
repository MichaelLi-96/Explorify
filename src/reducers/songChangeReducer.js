import { SONG_CHANGED } from '../actions/types';

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
		default:
			return state;
	}
}

export default songChangeReducer;
