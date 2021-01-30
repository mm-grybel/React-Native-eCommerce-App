import React from 'react';
import { Button, FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as shoppingCartActions from '../../store/actions/shopping-cart';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';

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

    const selectItemHandler = (id, name) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
            productName: name
        });
    };
    
    return (
        <FlatList 
            keyExtractor={item => item.productId}
            data={products}
            renderItem={itemData =>( 
                <ProductItem 
                    image={getProductImages(itemData.item.productId)}
                    //image={itemData.item.imageUrl} 
                    name={itemData.item.name} 
                    price={itemData.item.price} 
                    onSelect={() => {
                        selectItemHandler(itemData.item.productId, itemData.item.productName);
                    }}
                >
                    <Button 
                        color={Colors.maroon}
                        title="View Details" 
                        onPress={() => {
                            selectItemHandler(itemData.item.productId, itemData.item.productName);
                        }}
                    />
                    <Button 
                        color={Colors.salem}
                        title="Add to Cart"
                        onPress={() => {
                            dispatch(shoppingCartActions.addToShoppingCart(itemData.item));
                        }}
                    />
                </ProductItem>
            )}
        />
    );
};

ProductsScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'All Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navigationData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Cart"
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navigationData.navigation.navigate('ShoppingCart');
                    }}
                />
            </HeaderButtons>
        )
    };
};

export default ProductsScreen;
