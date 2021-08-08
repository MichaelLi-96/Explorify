import { SONG_PRESSED } from '../actions/types';

const songPressReducer = (state = false, action) => {
  switch (action.type) {
    case SONG_PRESSED:
      return !state;
    default:
      return state;
  }
};

export default songPressReducer;
