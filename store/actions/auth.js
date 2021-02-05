import { AsyncStorage } from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGNOUT = 'SIGNOUT';

let timer;

export const authenticate = (userId, token, tokenExpirationTime) => {
    return dispatch => {
        dispatch(setSignoutTimer(tokenExpirationTime));
        dispatch({
            type: AUTHENTICATE,
            userId: userId,
            token: token
        });
    };
};

export const signup = (email, password) => {
    return async dispatch => {
        // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxplod6pmMk_OnHgYvHu8xq9E_rCu4Gzc',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errorResponseData = await response.json();
            // console.log(errorResponseData);
            const errorId = errorResponseData.error.message;
            let message = 'Something went wrong';
            
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email already exists.';
            }

            throw new Error(message);
        }

        const responseData = await response.json();
        console.log(responseData);
        
        dispatch(
            authenticate(
                responseData.localId, 
                responseData.token,
                parseInt(responseData.expiresIn) * 1000
            )
        );

        const tokenExpirationDate = new Date(
            new Date().getTime() + parseInt(responseData.expiresIn) * 1000
        );
        saveDataToStorage(responseData.idToken, saveDataToStorage.localId, tokenExpirationDate);
    };
};

export const signin = (email, password) => {
    return async dispatch => {
        // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxplod6pmMk_OnHgYvHu8xq9E_rCu4Gzc',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errorResponseData = await response.json();
            // console.log(errorResponseData);
            const errorId = errorResponseData.error.message;
            let message = 'Something went wrong';

            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found.';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is invalid.';
            }

            throw new Error(message);
        }

        const responseData = await response.json();
        console.log(responseData);
        
        dispatch(
            authenticate(
                responseData.localId, 
                responseData.token,
                parseInt(responseData.expiresIn) * 1000
            )
        );

        const tokenExpirationDate = new Date(
            new Date().getTime() + parseInt(responseData.expiresIn) * 1000
        );
        saveDataToStorage(responseData.idToken, saveDataToStorage.localId, tokenExpirationDate);
    };
};

export const signout = () => {
    clearSignoutTimer();
    AsyncStorage.removeItem('userData');
    return { type: SIGNOUT };
};

const setSignoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(signout());
        }, expirationTime);
    };
};

const clearSignoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

const saveDataToStorage = (token, userId, tokenExpirationDate) => {
    AsyncStorage.setItem(
        'userData', 
        JSON.stringify({
            token: token,
            userId: userId,
            expirationDate: tokenExpirationDate.toISOString()
        })
    );
};