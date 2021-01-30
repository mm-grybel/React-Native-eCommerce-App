export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToShoppingCart = product => {
    return {
        type: ADD_TO_CART,
        product: product
    };
};

export const removeFromShoppingCart = productId => {
    return {
        type: REMOVE_FROM_CART,
        productId: productId
    };
};
