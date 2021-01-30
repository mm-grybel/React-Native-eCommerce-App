import PRODUCTS from '../../data/sample-data';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    // below: products where the creator ID is the ID of the currently logged in user
    ownerProducts: PRODUCTS.filter(product => product.creatorId === 'c1')
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            return {
                ...state,
                ownerProducts: state.ownerProducts.filter(
                    product => product.productId !== action.productId
                ),
                availableProducts: state.availableProducts.filter(
                    product => product.productId !== action.productId
                )
            };
    }
    return state;
};
