import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'

import ShoppingCartItem from './ShoppingCartItem';
import Colors from '../../constants/Colors';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>€{props.totalAmount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button 
                title={showDetails ? 'Hide Details' : 'Show Details'} 
                color={Colors.maroon}
                onPress={() => {
                    setShowDetails(previousState => !previousState);
                }}
            />
            {showDetails && (
                <View style={styles.detailItems}>
                    {props.items.map(shoppingCartItem => (
                        <ShoppingCartItem 
                            key={shoppingCartItem.productId}
                            name={shoppingCartItem.productName}
                            amount={shoppingCartItem.totalAmount}
                            quantity={shoppingCartItem.quantity}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: Colors.black,
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: Colors.white,
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    detailItems: {
        width: '100%'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    }
});

export default OrderItem;
