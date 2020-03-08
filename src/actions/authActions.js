import { 
	USER_REGISTERED, 
	USER_LOGGED_IN, 
	USER_LOGGED_OUT,
	CHECKED_JWT_TOKEN
} from './types';

export const userRegistered = (userAndToken) => {
	return {
		type: USER_REGISTERED,
		payload: userAndToken
	};
}

export const userLoggedIn = (userAndToken) => {
	return {
		type: USER_LOGGED_IN,
		payload: userAndToken
	};
}

export const userLoggedOut = () => {
	return {
		type: USER_LOGGED_OUT
	};
}

export const checkedJwtToken = (jwt) => {
	return {
		type: CHECKED_JWT_TOKEN,
		payload: jwt
	};
}