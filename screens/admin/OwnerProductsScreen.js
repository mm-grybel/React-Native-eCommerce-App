import React from 'react';
import { Button, FlatList, Platform, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

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

const OwnerProductsScreen = props => {
    const ownerProducts = useSelector(state => 
        state.products.ownerProducts
    );
    const dispatch = useDispatch();

    const editProductHandler = productId => {
        props.navigation.navigate('EditProduct', { productId: productId });
    };

    const deleteProductHandler = (productId) => {
        Alert.alert('Delete Product', 'Are you sure you want to delete this product?', [
            { text: 'No', style: 'default' },
            { text: 'Yes', style: 'destructive', 
                onPress: () => {
                    dispatch(productsActions.deleteProduct(productId));
                } 
            }
        ]);
    };

    return (
        <FlatList
            data={ownerProducts}
            keyExtractor={item => item.productId}
            renderItem={itemData => (
                <ProductItem 
                    image={getProductImages(itemData.item.productId)}
                    name={itemData.item.name} 
                    price={itemData.item.price} 
                    onSelect={() => {
                        editProductHandler(itemData.item.productId);
                    }}
                >
                    <Button 
                        color={Colors.maroon}
                        title="Edit" 
                        onPress={() => {
                            editProductHandler(itemData.item.productId);
                        }}
                    />
                    <Button 
                        color={Colors.salem}
                        title="Delete"
                        onPress={deleteProductHandler.bind(this, itemData.item.productId)}
                    />
                </ProductItem>
            )} 
        />
    );
};

OwnerProductsScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'Your Products',
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
                    title="Add"
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => {
                        navigationData.navigation.navigate('EditProduct');
                    }}
                />
            </HeaderButtons>
        )
    };
};

export default OwnerProductsScreen;
