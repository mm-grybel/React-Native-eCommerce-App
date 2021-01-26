import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const ProductsScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    return (
        <FlatList 
            keyExtractor={item => item.id}
            data={products}
            renderItem={itemData =>( 
                <ProductItem 
                    image={itemData.item.imageUrl} 
                    name={itemData.item.name} 
                    price={itemData.item.price} 
                    onViewDetail={() => {}} 
                    onAddToCart={() => {}} 
                />
            )}
        />
    );
};

ProductsScreen.navigationOptions = {
    headerTitle: 'All Products'
};

export default ProductsScreen;
