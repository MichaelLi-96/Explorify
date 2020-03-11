import { STORING_SONG_TO_BE_ADDED_TO_PLAYLIST,
		 REMOVING_SONG_TO_BE_ADDED_TO_PLAYLIST } from '../actions/types';

const INITIAL_STATE = { 
	song: {},
	isBeingAdded: false
};


const songToAddToPlaylistReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case STORING_SONG_TO_BE_ADDED_TO_PLAYLIST:
			return { 
				song: action.payload, 
				isBeingAdded: true
			};
		case REMOVING_SONG_TO_BE_ADDED_TO_PLAYLIST:
			return { 
				song: {}, 
				isBeingAdded: false
			};
		default:
			return state;
	}
}

export default songToAddToPlaylistReducer;

