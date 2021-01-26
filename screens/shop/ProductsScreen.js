import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

const ProductsScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    return (
        <FlatList 
            keyExtractor={item => item.id}
            data={products}
            renderItem={itemData => <Text>{itemData.item.name}</Text>}
        />
    );
};

ProductsScreen.navigationOptions = {
    headerTitle: 'All Products'
};

export default ProductsScreen;
