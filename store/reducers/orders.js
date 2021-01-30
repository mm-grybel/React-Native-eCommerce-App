import { PLACE_ORDER } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
    orders: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PLACE_ORDER:
            const newOrder = new Order(
                new Date().toDateString(),  // a timestamp used as an ID for now
                action.orderData.items,
                action.orderData.totalAmount,
                new Date()
            );
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            };
    }
    return state;
};
