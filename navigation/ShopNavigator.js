import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ProductsScreen from '../screens/shop/ProductsScreen';
import Colors from '../constants/Colors';

const ProductsNavigator = createStackNavigator(
    {
        Products: ProductsScreen
    }, 
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.maroon : ''
            },
            headerTintColor: Platform.OS === 'android' ? Colors.white : Colors.maroon
        }
    }
);

export default createAppContainer(ProductsNavigator);
