import Order from '../../models/order';

export const PLACE_ORDER = 'PLACE_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        // here - execute any async code you want, before the dispatch below
        const userId = getState().auth.userId;
        try {
            const response = await fetch(
                `https://rn-ecommerce-app-283fe-default-rtdb.firebaseio.com/orders/${userId}.json`
            );

            if (!response.ok) {
                throw new Error('Something went wrong.');
            }

            const responseData = await response.json();
            const loadedOrders = [];

            for (const key in responseData) {
                loadedOrders.push(
                    new Order(
                        key,
                        responseData[key].shoppingCartItems,
                        responseData[key].totalAmount,
                        new Date(responseData[key].date)
                    )
                );
            }

            // this will only be dispatched once the above operations are done
            dispatch({ type: SET_ORDERS, orders: loadedOrders });
        } catch (err) {
            // send to a custom analytics server, etc.
            throw err;
        }
    };
};

export const placeOrder = (shoppingCartItems, totalAmount) => {
    return async (dispatch, getState) => {
        const currentDate = new Date();
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        // here - execute any async code you want, before the dispatch below
        const response = await fetch(
            `https://rn-ecommerce-app-283fe-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                shoppingCartItems,
                totalAmount,
                date: currentDate.toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong.');
        }

        const responseData = await response.json();

        // this will only be dispatched once the above operations are done
        dispatch({
            type: PLACE_ORDER,
            orderData: {
                orderId: responseData.name,
                items: shoppingCartItems,
                totalAmount: totalAmount,
                date: currentDate 
            }
        });
    };
};