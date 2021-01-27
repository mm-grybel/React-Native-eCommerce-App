import React from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    Image,
    Button,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const getProductImages = (productId) => {
    switch (productId) {
        case 'p1':
            return require('../../assets/products/p1.jpg');
        case 'p2':
            return require('../../assets/products/p2.jpg');
        case 'p3':
            return require('../../assets/products/p3.jpg');
        case 'p4':
            return require('../../assets/products/p4.jpg');
        case 'p5':
            return require('../../assets/products/p5.jpg');
        case 'p6':
            return require('../../assets/products/p6.jpg');
        default:
            return require('../../assets/products/default.jpeg');
    }
};

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => 
        state.products.availableProducts.find(product => product.id === productId)
    );

    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image 
                style={styles.image} 
                source={getProductImages(selectedProduct.id)} 
            />
            <View>
                <Button 
                    color={Colors.maroon} 
                    title="Add to Cart" 
                    onPress={() => {
                        dispatch(cartActions.addToCart(selectedProduct));
                    }} 
                />
            </View>
            <Text style={styles.price}>€{selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = navigationData => {
    return {
        headerTitle: navigationData.navigation.getParam('productName')
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center',
    }
});

export default ProductDetailScreen;
