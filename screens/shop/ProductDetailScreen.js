import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet 
} from 'react-native';
import { useSelector } from 'react-redux';

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => 
        state.products.availableProducts.find(product => product.id === productId)
    );

    return (
        <View>
            <Text>{selectedProduct.name}</Text>
        </View>
    );
};

ProductDetailScreen.navigationOptions = navigationData => {
    return {
        headerTitle: navigationData.navigation.getParam('productName')
    };
};

const styles = StyleSheet.create({});

export default ProductDetailScreen;
