import React from 'react';
import { 
    View,
    ScrollView,
    KeyboardAvoidingView,
    Button,
    StyleSheet 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import InputField from '../../components/UI/InputField';
import Cart from '../../components/UI/Cart';
import Colors from '../../constants/Colors';

const AuthScreen = props => {
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
                            errorMessage="Please enter a valid email address."
                            onInputChange={() => {}}
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
                            errorMessage="Please enter a valid password."
                            onInputChange={() => {}}
                            initialValue=""
                        />
                        <View style={styles.buttonContainer}>
                            <Button 
                                title="Login"
                                color={Colors.maroon}
                                onPress={() => {}}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button 
                                title="Switch to Sign Up"
                                color={Colors.salem}
                                onPress={() => {}}
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
