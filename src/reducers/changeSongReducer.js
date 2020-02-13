import { SONG_CHANGED } from '../actions/types';

const INITIAL_STATE = { 
	name: 'Null Val'
};

const changeSongReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'SONG_CHANGED':
			return { name: action.payload };
		default:
			return state;
	}
}

export default changeSongReducer;
