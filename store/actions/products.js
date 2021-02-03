import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => {

        // here - execute any async code you want, before the dispatch below
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
            dispatch({ type: SET_PRODUCTS, products: loadedProducts });
        } catch (err) {
            // send to a custom analytics server, etc.
            throw err;
        }
    };
};

export const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        productId: productId
    };
};

export const createProduct = (name, price, description, imageUrl) => {
    return async dispatch => {

        // here - execute any async code you want, before the dispatch below
        const response = await fetch(
            'https://rn-ecommerce-app-283fe-default-rtdb.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                price,
                description,
                imageUrl
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
                imageUrl
            }
        });
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
  