import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    Platform,
    StyleSheet 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const ShoppingCartItem = props => {
    return (
        <View style={styles.shoppingCartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} </Text>
                <Text style={styles.name}>{props.name}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>€{props.amount.toFixed(2)}</Text>
                {props.deletable && (
                    <TouchableOpacity 
                        onPress={props.onRemove}
                        style={styles.deleteButton}
                    >
                        <Ionicons 
                            name={Platform.OS === 'android' ? 'md-trash': 'ios-trash'}
                            size={23}
                            color={Colors.monza}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    deleteButton: {
        marginLeft: 20
    },
    shoppingCartItem: {
        padding: 10,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    name: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    }
});

export default ShoppingCartItem;