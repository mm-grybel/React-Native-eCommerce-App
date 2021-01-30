import PRODUCTS from '../../data/sample-data';
import Product from '../../models/product';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    // below: products where the creator ID is the ID of the currently logged in user
    ownerProducts: PRODUCTS.filter(product => product.creatorId === 'c1')
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT:
            const newProduct = new Product(
                new Date().toString(), // productId
                'c1', // creatorId
                action.productData.name,
                action.productData.price,
                action.productData.description,
                action.productData.imageUrl
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                ownerProducts: state.ownerProducts.concat(newProduct)
            };
        case UPDATE_PRODUCT:
            const productIndex = state.ownerProducts.findIndex(
                product => product.productId === action.productId
            );
            const updatedProduct = new Product(
                action.productId,
                state.ownerProducts[productIndex].creatorId, // the ID stays the same
                action.productData.name,
                state.ownerProducts[productIndex].price, // price should not be editable, so we keep original
                action.productData.description,
                action.productData.imageUrl
            );
            const updatedOwnerProducts = [...state.ownerProducts];
            updatedOwnerProducts[productIndex] = updatedProduct;
            const availableProductIndex = state.availableProducts.findIndex(
                product => product.productId === action.productId
            );
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;
            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                ownerProducts: updatedOwnerProducts
            };
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
