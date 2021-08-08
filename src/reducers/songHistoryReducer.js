import {
  NEW_SONG_ADDED_TO_HISTORY,
  PREV_SONG_PRESSED,
  NEXT_SONG_PRESSED,
  SINGLE_SONG_PLAYED,
  PLAYLIST_ALBUM_PLAYED,
  SHUFFLE_PRESSED,
  UNSHUFFLE_PRESSED,
  SONG_HISTORY_CLEARED,
} from '../actions/types';

const INITIAL_STATE = {
  songHistoryPlaylist: [],
  unshuffledSongHistoryPlaylist: [],
  currentSongHistoryIndex: -1,
  currentSongHistoryLength: 0,
  currentSongId: '',
  isPlayingAlbumPlaylist: false,
};

const songHistoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_SONG_ADDED_TO_HISTORY:
      const newSongHistoryPlaylist = state.songHistoryPlaylist;
      newSongHistoryPlaylist.push(action.payload);
      return {
        ...state,
        songHistoryPlaylist: newSongHistoryPlaylist,
        currentSongHistoryIndex: state.currentSongHistoryIndex + 1,
        currentSongHistoryLength: state.currentSongHistoryLength + 1,
        currentSongId: action.payload._id,
      };
    case PREV_SONG_PRESSED:
      return {
        ...state,
        currentSongHistoryIndex: state.currentSongHistoryIndex - 1,
      };
    case NEXT_SONG_PRESSED:
      return {
        ...state,
        currentSongHistoryIndex: state.currentSongHistoryIndex + 1,
      };
    case SINGLE_SONG_PLAYED:
      return {
        songHistoryPlaylist: [],
        unshuffledSongHistoryPlaylist: [],
        currentSongHistoryIndex: -1,
        currentSongHistoryLength: 0,
        currentSongId: '',
        isPlayingAlbumPlaylist: false,
      };
    case PLAYLIST_ALBUM_PLAYED:
      return {
        songHistoryPlaylist: action.payload,
        unshuffledSongHistoryPlaylist: action.payload,
        currentSongHistoryIndex: 0,
        currentSongHistoryLength: action.payload.length,
        currentSongId: action.payload[0]._id,
        isPlayingAlbumPlaylist: true,
      };
    case SHUFFLE_PRESSED:
      let beforeRemaining = state.songHistoryPlaylist;
      beforeRemaining = beforeRemaining.slice(0, state.currentSongHistoryIndex + 1);

      let shuffledRemaining = state.songHistoryPlaylist;
      shuffledRemaining = shuffledRemaining.slice(state.currentSongHistoryIndex + 1, state.currentSongHistoryLength);
      // Shuffle remaining songs
      var currentIndex = shuffledRemaining.length,
        temporaryValue,
        randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = shuffledRemaining[currentIndex];
        shuffledRemaining[currentIndex] = shuffledRemaining[randomIndex];
        shuffledRemaining[randomIndex] = temporaryValue;
      }

      let newSongHistory = [...beforeRemaining, ...shuffledRemaining];

      return {
        ...state,
        songHistoryPlaylist: newSongHistory,
      };
    case UNSHUFFLE_PRESSED:
      let newStartingIndex = 0;
      for (let i = 0; i < state.currentSongHistoryLength; i++) {
        if (state.unshuffledSongHistoryPlaylist[i] === state.songHistoryPlaylist[state.currentSongHistoryIndex]) {
          newStartingIndex = i;
          break;
        }
      }
      return {
        ...state,
        songHistoryPlaylist: state.unshuffledSongHistoryPlaylist,
        currentSongHistoryIndex: newStartingIndex,
      };
    case SONG_HISTORY_CLEARED:
      return {
        songHistoryPlaylist: [],
        unshuffledSongHistoryPlaylist: [],
        currentSongHistoryIndex: -1,
        currentSongHistoryLength: 0,
        currentSongId: '',
        isPlayingAlbumPlaylist: false,
      };
    default:
      return state;
  }
};

export default songHistoryReducer;
