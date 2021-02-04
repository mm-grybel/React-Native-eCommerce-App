export const PLACE_ORDER = 'PLACE_ORDER';

export const placeOrder = (shoppingCartItems, totalAmount) => {
    return async dispatch => {
        const currentDate = new Date();

        // here - execute any async code you want, before the dispatch below
        const response = await fetch(
            'https://rn-ecommerce-app-283fe-default-rtdb.firebaseio.com/orders/c1.json', {
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
