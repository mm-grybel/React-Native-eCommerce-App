import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ProductsScreen from '../screens/shop/ProductsScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Colors from '../constants/Colors';

const ProductsNavigator = createStackNavigator(
    {
        Products: ProductsScreen,
        ProductDetail: ProductDetailScreen
    }, 
    {
        defaultNavigationOptions: {
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
        }
    }
);

export default createAppContainer(ProductsNavigator);
