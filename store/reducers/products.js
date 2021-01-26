import PRODUCTS from '../../data/sample-data';

const initialState = {
    availableProducts: PRODUCTS,
    // below: products where the creator ID is the ID of the currently logged in user
    creatorProducts: PRODUCTS.filter(product => product.creatorId === 'c1')
};

export default (state = initialState, action) => {
    return state;
};
