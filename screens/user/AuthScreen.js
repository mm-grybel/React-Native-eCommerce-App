import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { 
    View,
    ScrollView,
    KeyboardAvoidingView,
    Button,
    Alert,
    ActivityIndicator,
    StyleSheet 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import InputField from '../../components/UI/InputField';
import Cart from '../../components/UI/Cart';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidity = {
            ...state.inputValidity,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;  
        for (const key in updatedValidity) {
            updatedFormIsValid = updatedFormIsValid && updatedValidity[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidity: updatedValidity,
            inputValues: updatedValues
        };
    }
    return state;
};

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignUp, setIsSignUp] = useState(false);

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
            
        },
        inputValidity: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred.', error, [{ text: 'OK' }]);
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        if (isSignUp) {
            action = authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password
            );
        } else {
            action = authActions.signin(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Shop');
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }  
    };

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView 
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient 
                colors={['#faf28c', '#ffed02']}
                style={styles.gradient}
            >
                <Cart style={styles.authContainer}>
                    <ScrollView>
                        <InputField 
                            id="email"
                            label="Email"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <InputField 
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <View style={styles.buttonContainer}>
                            {isLoading ? (
                                <ActivityIndicator size="small" color={Colors.maroon} />
                            ) : (
                                <Button 
                                    title={isSignUp ? 'Sign Up' : 'Sign In'}
                                    color={Colors.maroon}
                                    onPress={authHandler}
                                />
                            )}
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button 
                                title={`Switch to ${isSignUp ? 'Sign In' : 'Sign Up'}`}
                                color={Colors.salem}
                                onPress={() => {
                                    setIsSignUp(previousState => !previousState);
                                }}
                            />
                        </View>
                    </ScrollView>
                </Cart>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

AuthScreen.navigationOptions = {
    headerTitle: 'Authentication'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    gradient: {
        flex: 1,
        // ALTERNATIVELY to flex: 1 >> width and height: 100%
        // width: '100%',
        // height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default AuthScreen;