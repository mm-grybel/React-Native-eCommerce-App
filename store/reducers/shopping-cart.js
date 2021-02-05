import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/shopping-cart';
import { PLACE_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/products';
import ShoppingCartItem from '../../models/shopping-cart-item';

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

            let updatedOrNewShoppingCartItem;

            if (state.items[addedProduct.productId]) {
                // already have this item in the shopping cart
                updatedOrNewShoppingCartItem = new ShoppingCartItem(
                    productName,
                    productPrice,
                    state.items[addedProduct.productId].quantity + 1,
                    state.items[addedProduct.productId].totalAmount + productPrice
                );
            } else {
                // add the item to the shopping cart
                updatedOrNewShoppingCartItem = new ShoppingCartItem(
                    productName, 
                    productPrice, 
                    1, 
                    productPrice
                );
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.productId]: updatedOrNewShoppingCartItem },
                totalAmount: state.totalAmount + productPrice
            };
        case REMOVE_FROM_CART:
            const selectedShoppingCartItem = state.items[action.productId];
            const currentQty = selectedShoppingCartItem.quantity;
            let updatedShoppingCartItems;

            if (currentQty > 1) {
                // need to reduce it, not erase it
                const updatedShoppingCartItem = new ShoppingCartItem(
                    selectedShoppingCartItem.productName,
                    selectedShoppingCartItem.productPrice,
                    selectedShoppingCartItem.quantity - 1,
                    selectedShoppingCartItem.totalAmount - selectedShoppingCartItem.productPrice
                );
                updatedShoppingCartItems = { ...state.items, [action.productId]: updatedShoppingCartItem };
            } else {
                // need to erase it
                updatedShoppingCartItems = { ...state.items };
                delete updatedShoppingCartItems[action.productId];
            }
            return {
                ...state,
                items: updatedShoppingCartItems,
                totalAmount: state.totalAmount - selectedShoppingCartItem.productPrice
            };
        case PLACE_ORDER:
            return initialState; // this clears the Shopping Cart
        case DELETE_PRODUCT:
            if (!state.items[action.productId]) {
                return state;
            }
            const updatedItems = {...state.items};
            const itemsTotal = state.items[action.productId].totalAmount;
            delete updatedItems[action.productId];
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemsTotal
            };
    }
    return state;
};