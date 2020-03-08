import axios from "axios";
import { API_URL } from "../url"
import { 
	USER_REGISTERED, 
	USER_LOGGED_IN, 
	USER_LOGGED_OUT,
	CHECKED_JWT_TOKEN
} from '../actions/types';

const INITIAL_STATE = {
	jwt: localStorage.getItem('jwt'),
	userIsLoggedIn: false, 
	user: {}
};

const songChangeReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_REGISTERED:
			localStorage.setItem('jwt', action.payload.token);
			return { 
				token: action.payload.token,
				userIsLoggedIn: true,
				user: action.payload.user
			};
		case USER_LOGGED_IN:
			localStorage.setItem('jwt', action.payload.token);
			return { 
				token: action.payload.token,
				userIsLoggedIn: true,
				user: action.payload.user
			};
		case USER_LOGGED_OUT:
			localStorage.removeItem('jwt');
			return { 
				token: null,
				userIsLoggedIn: false, 
				user: {}
			};
		case CHECKED_JWT_TOKEN:
			axios.get(`${API_URL}/auth/decodeJwt`, {
				token: action.payload.jwt
			})
		  	.then((response) => {
		  		const jwtExpireDate = response.data.exp;
		  		const currentTime = Date.now().valueOf() / 1000;
		  		// If jwt has expired
				if ( jwtExpireDate < currentTime) {
					localStorage.removeItem('jwt');
					return { 
						token: null,
						userIsLoggedIn: false, 
						user: {}
					};
				}
				else if(state.userIsLoggedIn === false) {
					const userId = response.data.userId;
					axios.get(`${API_URL}/users/${userId}`)
				  	.then((response) => {
				  		return {
				  			token: action.payload.jwt,
				  			userIsLoggedIn: true,
				  			user: response.data
				  		}
				  	})
				  	.catch(function (error) {
				  		console.log(error);
				  	});
				}

		  	})
		  	.catch(function (error) {
		  		console.log(error);
		  	});

			return { 
				...state
			};
		default:
			return state;
	}
}

export default songChangeReducer;
