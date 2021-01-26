import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    Button, 
    StyleSheet
} from 'react-native';

import Colors from '../../constants/Colors';

const ProductItem = props => {
    return (
        <View style={styles.product}>
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.image}
                    //source={require('../../assets/products/p1.jpg')}
                    //source={{uri: props.imageUrl}} 
                    source={props.image}
                />
            </View>
            <View style={styles.details}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.price}>€{props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                <Button 
                    color={Colors.maroon}
                    title="View Details" 
                    onPress={props.onViewDetail}
                />
                <Button 
                    color={Colors.salem}
                    title="Add to Cart"
                    onPress={props.onAddToCart}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
        shadowColor: Colors.black,
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: Colors.white,
        height: 300,
        margin: 20
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    name: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
});

export default ProductItem;
