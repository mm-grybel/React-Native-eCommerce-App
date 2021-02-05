import React from 'react';
import { View, Button, Platform, SafeAreaView } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import ProductsScreen from '../screens/shop/ProductsScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import ShoppingCartScreen from '../screens/shop/ShoppingCartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import OwnerProductsScreen from '../screens/admin/OwnerProductsScreen';
import EditProductScreen from '../screens/admin/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/main/StartupScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const defaultNaOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.maroon : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? Colors.white : Colors.maroon
};

const ProductsNavigator = createStackNavigator(
    {
        Products: ProductsScreen,
        ProductDetail: ProductDetailScreen,
        ShoppingCart: ShoppingCartScreen
    }, 
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons 
                    name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        },
        defaultNavigationOptions: defaultNaOptions
    }
);

const OrdersNavigator = createStackNavigator(
    {
        Orders: OrdersScreen
    }, 
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons 
                    name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        },
        defaultNavigationOptions: defaultNaOptions
    }
);

const AdminNavigator = createStackNavigator(
    {
        OwnerProducts: OwnerProductsScreen,
        EditProduct: EditProductScreen
    }, 
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons 
                    name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        },
        defaultNavigationOptions: defaultNaOptions
    }
);

const ShopNavigator = createDrawerNavigator(
    {
        Products: ProductsNavigator,
        Orders: OrdersNavigator,
        Admin: AdminNavigator
    }, 
    {
        contentOptions: {
            activeTintColor: Colors.maroon
        },
        contentComponent: props => {
            const dispatch = useDispatch();
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                        <DrawerItems {...props} />
                        <Button 
                            title="Sign Out" 
                            color={Colors.maroon}
                            onPress={() => {
                                dispatch(authActions.signout());
                            }} 
                        />
                    </SafeAreaView>
                </View>
            );
        }
    }
);

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
});

const MainNavigator = createSwitchNavigator(
    {
        Startup: StartupScreen,
        Auth: AuthNavigator,
        Shop: ShopNavigator
    },
    {
        defaultNavigationOptions: defaultNaOptions
    });

export default createAppContainer(MainNavigator);
