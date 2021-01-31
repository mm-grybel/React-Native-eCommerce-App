import React, { useCallback, useEffect, useReducer } from 'react';
import { 
    View, 
    ScrollView, 
    Platform, 
    Alert,
    KeyboardAvoidingView,
    StyleSheet 
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import InputField from '../../components/UI/InputField';
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
            style={{ flex: 1 }}
            behavior="padding" 
            keyboardVerticalOffset={20}
        >
            <ScrollView>
                <View style={styles.form}>
                    <InputField 
                        id="name"
                        label="Name"
                        errorMessage="Please enter a valid product name."
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.name : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <InputField 
                        id="imageUrl"
                        label="Image URL"
                        errorMessage="Please enter a valid product image URL."
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    {editedProduct ? null : (
                        <InputField 
                            id="price"
                            label="Price"
                            errorMessage="Please enter a valid product price."
                            keyboardType="decimal-pad"
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}
                        />
                    )}
                    <InputField 
                        id="description"
                        label="Description"
                        errorMessage="Please enter a valid product description."
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    }
});

export default EditProductScreen;
