import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
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

const ProductsScreen = props => {
    const products = useSelector(state => state.products.availableProducts);

    const dispatch = useDispatch();
    
    return (
        <FlatList 
            keyExtractor={item => item.id}
            data={products}
            renderItem={itemData =>( 
                <ProductItem 
                    image={getProductImages(itemData.item.id)}
                    //image={itemData.item.imageUrl} 
                    name={itemData.item.name} 
                    price={itemData.item.price} 
                    onViewDetail={() => {
                        props.navigation.navigate('ProductDetail', { 
                                productId: itemData.item.id,
                                productName: itemData.item.name
                            });
                        }} 
                    onAddToCart={() => {
                        dispatch(cartActions.addToCart(itemData.item));
                    }} 
                />
            )}
        />
    );
};

ProductsScreen.navigationOptions = {
    headerTitle: 'All Products'
};

export default ProductsScreen;
