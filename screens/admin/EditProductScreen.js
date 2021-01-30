import React, { useState, useCallback, useEffect } from 'react';
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

const EditProductScreen = props => {
    const productId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => 
        state.products.ownerProducts.find(product => product.productId === productId)
    );
    const dispatch = useDispatch();

    const [name, setName] = useState(editedProduct ? editedProduct.name : '');
    const [nameIsValid, setNameIsValid] = useState(false);
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');

    const submitHandler = useCallback(() => {
        if (!nameIsValid) {
            Alert.alert('Invalid input', 'Please check the errors in the form.', [
                { text: 'OK' }
            ]);
            return;
        }
        if (editedProduct) {
            dispatch(
                productActions.updateProduct(productId, name, description, imageUrl)
            );
        } else {
            dispatch(
                // we need to convert the price from string to a number by
                // adding a + sign, that is: +price
                productActions.createProduct(name, +price, description, imageUrl)
            );
        }
        props.navigation.goBack();
    }, [dispatch, productId, name, price, description, imageUrl]);
    
    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
        }, [submitHandler]);

    const nameChangeHandler = text => {
        if (text.trim().length > 0) {  // trim() removes whitespace from both sides of a string
            setNameIsValid(false);
        } else {
            setNameIsValid(true);
        }
        setName(text);
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput 
                        style={styles.input} 
                        value={name} 
                        onChangeText={nameChangeHandler} 
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onEndEditing={() => console.log('onEndEditing') }
                        onSubmitEditing={() => console.log('onSubmitEditing')}
                    />
                    {!nameIsValid && <Text>Please enter a valid product name.</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput 
                        style={styles.input} 
                        value={imageUrl} 
                        onChangeText={text => setImageUrl(text)} 
                    />
                </View>
                {editedProduct ? null : (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput 
                            style={styles.input} 
                            value={price} 
                            onChangeText={text => setPrice(text)}
                            keyboardType="decimal-pad" 
                        />
                    </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                        style={styles.input} 
                        value={description} 
                        onChangeText={text => setDescription(text)} 
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
