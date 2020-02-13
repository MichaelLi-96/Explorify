import { SONG_CHANGED } from '../actions/types';

const INITIAL_STATE = { 
	src: 'https://spotify-clone.s3-us-west-1.amazonaws.com/When+we+all+fall+asleep+where+do+we+go/05+all+the+good+girls+go+to+hell.m4a',
	name: 'All the good girls go to hell'
};

const changeSongReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SONG_CHANGED:
			return { src: action.payload.src, name: action.payload.name };
		default:
			return state;
	}
}

export default changeSongReducer;
