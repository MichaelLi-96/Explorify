import { SONG_CHANGED } from '../actions/types';

const INITIAL_STATE = { 
	src: '',
	name: 'All the good girls go to hell'
};

const songChangeReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SONG_CHANGED:
			return { src: action.payload.src, name: action.payload.name };
		default:
			return state;
	}
}

export default songChangeReducer;
