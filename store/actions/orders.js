export const PLACE_ORDER = 'PLACE_ORDER';

export const placeOrder = (shoppingCartItems, totalAmount) => {
    return {
        type: PLACE_ORDER,
        orderData: {
            items: shoppingCartItems,
            totalAmount: totalAmount
        }
    };
};
