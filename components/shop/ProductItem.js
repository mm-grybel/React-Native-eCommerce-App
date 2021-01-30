import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    Button, 
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    StyleSheet,
} from 'react-native';

import Colors from '../../constants/Colors';

const ProductItem = props => {
    let TouchableComp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback;
    }
    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
                <TouchableComp onPress={props.onSelect} useForeground>
                    <View>
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
                            {props.children}
                        </View>
                    </View>
                </TouchableComp> 
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
        height: 330,
        margin: 20
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '65%',
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
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '20%',
        paddingHorizontal: 20
    }
});

export default ProductItem;
