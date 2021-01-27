import { ADD_TO_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
    items: {},
    totalAmount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productName = addedProduct.name;
            const productPrice = addedProduct.price;

            if (state.items[addedProduct.id]) {
                // already have this item in the cart
                const updatedCartItem = new CartItem(
                    productName,
                    productPrice,
                    state.items[addedProduct.id].quantity + 1,
                    state.items[addedProduct.id].totalAmount + productPrice
                );
                return {
                    ...state,
                    items: { ...state.items, [addedProduct.id]: updatedCartItem },
                    totalAmount: state.totalAmount + productPrice
                };
            } else {
                // add the item to the cart
                const newCartIem = new CartItem(productName, productPrice, 1, productPrice);
                return {
                    ...state,
                    items: { ...state.items, [addedProduct.id]: newCartIem },
                    totalAmount: state.totalAmount + productPrice
                };
            }
    }
    return state;
};