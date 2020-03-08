import { 
	USER_REGISTERED, 
	USER_LOGGED_IN, 
	USER_LOGGED_OUT,
	CHECKED_JWT_TOKEN
} from '../actions/types';

const INITIAL_STATE = {
	jwt: localStorage.getItem('jwt'),
	jwtIsActive: false, 
	user: {}
};

const songChangeReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_REGISTERED:
			localStorage.setItem('jwt', action.payload.token);
			return { 
				token: action.payload.token,
				jwtIsActive: true,
				user: action.payload.user
			};
		case USER_LOGGED_IN:
			localStorage.setItem('jwt', action.payload.token);
			return { 
				token: action.payload.token,
				jwtIsActive: true,
				user: action.payload.user
			};
		case USER_LOGGED_OUT:
			localStorage.removeItem('jwt');
			return { 
				token: null,
				jwtIsActive: false, 
				user: {}
			};
		case CHECKED_JWT_TOKEN:
			return { 
				jwtIsActive: action.payload.jwtIsActive
			};
		default:
			return state;
	}
}

export default songChangeReducer;
