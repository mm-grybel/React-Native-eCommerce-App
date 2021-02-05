import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text,
    FlatList, 
    Platform, 
    ActivityIndicator, 
    StyleSheet 
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import Colors from '../../constants/Colors';
import * as ordersActions from '../../store/actions/orders';

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(() => {
            setIsLoading(false);
        });
    }, [dispatch]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.maroon} />
            </View>
        );
    }

    if (orders.length === 0) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>No orders found, maybe start ordering some products?</Text>
            </View>
        );
    }

    return (
        <FlatList 
            data={orders}
            keyExtractor={item => item.orderId}
            renderItem={itemData => (
                <OrderItem 
                    totalAmount={itemData.item.totalAmount} 
                    date={itemData.item.readableDate} 
                    items={itemData.item.items}
                />
            )}
        />
    );
};

OrdersScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'Your Orders',
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
        )
    };
}

const styles = StyleSheet.create({
    centered: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});

export default OrdersScreen;