export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        productId: productId
    };
};

export const createProduct = (name, price, description, imageUrl) => {
    return {
        type: CREATE_PRODUCT,
        productData: {
            name,
            price,
            description,
            imageUrl
        }
    };
};
  
export const updateProduct = (productId, name, description, imageUrl) => {
    return {
        type: UPDATE_PRODUCT,
        productId: productId,
        productData: { // price should not be editable!
            name,
            description,
            imageUrl
        }
    };
};
  