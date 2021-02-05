import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        // here - execute any async code you want, before the dispatch below
        const userId = getState().auth.userId;
        try {
            const response = await fetch(
                'https://rn-ecommerce-app-283fe-default-rtdb.firebaseio.com/products.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong.');
            }

            const responseData = await response.json();
            const loadedProducts = [];

            for (const key in responseData) {
                loadedProducts.push(
                    new Product(
                        key,
                        'c1',
                        responseData[key].name,
                        responseData[key].price,
                        responseData[key].description,
                        responseData[key].imageUrl
                    )
                );
            }

            // this will only be dispatched once the above operations are done
            dispatch({ 
                type: SET_PRODUCTS, 
                products: loadedProducts,
                userProducts: loadedProducts.filter(product => product.creatorId === userId)
            });
        } catch (err) {
            // send to a custom analytics server, etc.
            throw err;
        }
    };
};

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        // here - execute any async code you want, before the dispatch below
        const token = getState().auth.token;
        try {
            const response = await fetch(
                `https://rn-ecommerce-app-283fe-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Something went wrong.');
            }

            // this will only be dispatched once the above operations are done
            dispatch({ type: DELETE_PRODUCT, productId: productId });
        } catch (err) {
            // send to a custom analytics server, etc.
            throw err;
        }
    };
};

export const createProduct = (name, price, description, imageUrl) => {
    return async (dispatch, getState) => {
        // here - execute any async code you want, before the dispatch below
        const token = getState().auth.token;
        const response = await fetch(
            `https://rn-ecommerce-app-283fe-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                price,
                description,
                imageUrl,
                creatorId: userId // creatorId is the id of the logged in user (userId)
            })
        });

        const responseData = await response.json();

        console.log(responseData);

        // this will only be dispatched once the above operations are done
        dispatch({
            type: CREATE_PRODUCT,
            productData : {
                id: responseData.name,
                name,
                price,
                description,
                imageUrl,
                creatorId: userId // creatorId is the id of the logged in user (userId)
            }
        });
    };
};
  
export const updateProduct = (productId, name, description, imageUrl) => {
    return async (dispatch, getState) => {
        // console.log(getState());

        const token = getState().auth.token;

        // here - execute any async code you want, before the dispatch below
        try {
            const response = await fetch(
                `https://rn-ecommerce-app-283fe-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    description,
                    imageUrl
                })
            });

            if (!response.ok) {
                throw new Error('Something went wrong.');
            }

            // this will only be dispatched once the above operations are done
            dispatch({
                type: UPDATE_PRODUCT,
                productId: productId,
                productData : { // price should not be editable!
                    name,
                    description,
                    imageUrl
                }
            });
        } catch (err) {
            // send to a custom analytics server, etc.
            throw err;
        }
    };
};
  