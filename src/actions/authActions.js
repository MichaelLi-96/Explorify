import { 
	USER_REGISTERED, 
	USER_LOGGED_IN, 
	USER_LOGGED_OUT,
	CHECKED_JWT_TOKEN,
	USER_CHANGED_DATA
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

export const checkedJwtToken = (authDetails) => {
	return {
		type: CHECKED_JWT_TOKEN,
		payload: authDetails
	};
}

export const userChangedData = (user) => {
	return {
		type: USER_CHANGED_DATA,
		payload: user
	};
}