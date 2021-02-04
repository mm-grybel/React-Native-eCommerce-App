import { PLACE_ORDER, SET_ORDERS } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
    orders: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                orders: action.orders
            };
        case PLACE_ORDER:
            const newOrder = new Order(
                action.orderData.orderId,
                action.orderData.items,
                action.orderData.totalAmount,
                action.orderData.date
            );
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            };
    }
    return state;
};
