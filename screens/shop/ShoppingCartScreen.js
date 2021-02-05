import React, { useState } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    Button,
    ActivityIndicator, 
    StyleSheet 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import ShoppingCartItem from '../../components/shop/ShoppingCartItem';
import * as shoppingCartActions from '../../store/actions/shopping-cart';
import * as ordersActions from '../../store/actions/orders';

const ShoppingCartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);

    const shoppingCartTotalAmount = useSelector(state => state.shoppingCart.totalAmount);
    const shoppingCartIems = useSelector(state => {
        const modifiedShoppingCartItems = [];
        for (const key in state.shoppingCart.items) {
            modifiedShoppingCartItems.push({
                productId: key,
                productName: state.shoppingCart.items[key].productName,
                productPrice: state.shoppingCart.items[key].productPrice,
                quantity: state.shoppingCart.items[key].quantity,
                totalAmount: state.shoppingCart.items[key].totalAmount 
            });
        }
        return modifiedShoppingCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1
        );
    });
    const dispatch = useDispatch();

    const placeOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(ordersActions.placeOrder(shoppingCartIems, shoppingCartTotalAmount));
        setIsLoading(false);
    };

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:{' '} 
                    <Text style={styles.amount}>€{Math.round(shoppingCartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                {isLoading ? (
                    <ActivityIndicator size="small" color={Colors.maroon} />
                ) : (
                    <Button 
                        color={Colors.christi} 
                        title="Place Order" 
                        disabled={shoppingCartIems.length === 0} 
                        onPress={placeOrderHandler}
                    />
                )}
            </View>
            <FlatList 
                data={shoppingCartIems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <ShoppingCartItem 
                        quantity={itemData.item.quantity}
                        name={itemData.item.productName}
                        amount={itemData.item.totalAmount}
                        deletable
                        onRemove={() => {
                            dispatch(shoppingCartActions.removeFromShoppingCart(itemData.item.productId));
                        }}
                    />
                )}
            />
        </View>
    );
};

ShoppingCartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: Colors.black,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: Colors.white
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.maroon
    }
});

export default ShoppingCartScreen;