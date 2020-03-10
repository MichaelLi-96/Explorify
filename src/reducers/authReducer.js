import { 
	USER_REGISTERED, 
	USER_LOGGED_IN, 
	USER_LOGGED_OUT,
	CHECKED_JWT_TOKEN,
	USER_CHANGED_DATA
} from '../actions/types';

const INITIAL_STATE = {
	jwt: localStorage.getItem("jwt"),
	userIsLoggedIn: false, 
	user: {}
};

const songChangeReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_REGISTERED:
			localStorage.setItem('jwt', action.payload.token);
			return { 
				jwt: action.payload.token,
				userIsLoggedIn: true,
				user: action.payload.user
			};
		case USER_LOGGED_IN:
			localStorage.setItem('jwt', action.payload.token);
			return { 
				jwt: action.payload.token,
				userIsLoggedIn: true,
				user: action.payload.user
			};
		case USER_LOGGED_OUT:
			localStorage.removeItem('jwt');
			return { 
				jwt: null,
				userIsLoggedIn: false, 
				user: {}
			};
		case CHECKED_JWT_TOKEN:
			if(action.payload.jwt === null) {
				localStorage.removeItem('jwt');
			}
			return { 
				jwt: action.payload.jwt,
				userIsLoggedIn: action.payload.userIsLoggedIn, 
				user: action.payload.user
			};
		case USER_CHANGED_DATA:
			return { 
				...state,
				user: action.payload
			};
		default:
			return state;
	}
}

export default songChangeReducer;
