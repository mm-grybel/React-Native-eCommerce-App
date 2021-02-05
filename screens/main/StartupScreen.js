import React, { useEffect } from 'react';
import { 
    View,
    ActivityIndicator,
    AsyncStorage,
    StyleSheet 
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const trySignIn = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate('Auth');
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, userId, expirationDate } = transformedData;
            const tokenExpirationDate = new Date(expirationDate);

            // token expiration date in the past OR can't find the token OR can't find the userId
            if (tokenExpirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth');
                return;
            }

            const expirationTime = tokenExpirationDate.getTime() - new Date().getTime();

            props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(userId, token, expirationTime));
        };

        trySignIn();
    }, [dispatch]);

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={Colors.maroon} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;
