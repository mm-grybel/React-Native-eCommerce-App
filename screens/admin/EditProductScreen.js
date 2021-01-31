import React, { useCallback, useEffect, useReducer } from 'react';
import { 
    Text, 
    TextInput, 
    View, 
    ScrollView, 
    Platform, 
    Alert,
    StyleSheet 
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import * as productActions from '../../store/actions/products';

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

const EditProductScreen = props => {
    const productId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => 
        state.products.ownerProducts.find(product => product.productId === productId)
    );
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            name: editedProduct ? editedProduct.name : '',
            price: '',
            description: editedProduct ? editedProduct.description : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : ''
            
        },
        inputValidity: {
            name: editedProduct ? true : false,
            price: editedProduct ? true : false,
            description: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    });

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Invalid input', 'Please check the errors in the form.', [
                { text: 'OK' }
            ]);
            return;
        }
        if (editedProduct) {
            dispatch(
                productActions.updateProduct(
                    productId, 
                    formState.inputValues.name, 
                    formState.inputValues.description, 
                    formState.inputValues.imageUrl
                )
            );
        } else {
            dispatch(
                // we need to convert the price from string to a number by
                // adding a + sign, that is: +price
                productActions.createProduct(
                    formState.inputValues.name, 
                    +formState.inputValues.price, 
                    formState.inputValues.description, 
                    formState.inputValues.imageUrl
                )
            );
        }
        props.navigation.goBack();
    }, [dispatch, productId, formState]);
    
    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
        }, [submitHandler]);

    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = false;
        if (text.trim().length > 0) {  // trim() removes whitespace from both sides of a string
            isValid = true;
        }
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: text,
            isValid: isValid,
            input: inputIdentifier
        });
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput 
                        style={styles.input} 
                        value={formState.inputValues.name} 
                        onChangeText={textChangeHandler.bind(this, 'name')} 
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                    />
                    {!formState.inputValidity.name && <Text>Please enter a valid product name.</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput 
                        style={styles.input} 
                        value={formState.inputValues.imageUrl} 
                        onChangeText={textChangeHandler.bind(this, 'imageUrl')} 
                    />
                </View>
                {editedProduct ? null : (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput 
                            style={styles.input} 
                            value={formState.inputValues.price} 
                            onChangeText={textChangeHandler.bind(this, 'price')}
                            keyboardType="decimal-pad" 
                        />
                    </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                        style={styles.input} 
                        value={formState.inputValues.description} 
                        onChangeText={textChangeHandler.bind(this, 'description')} 
                    />
                </View>
            </View>
        </ScrollView>
    );
};

EditProductScreen.navigationOptions = navigationData => {
    const submitProduct = navigationData.navigation.getParam('submit');

    return {
        headerTitle: navigationData.navigation.getParam('productId') 
            ? 'Edit Product' 
            : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Save"
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submitProduct}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProductScreen;
