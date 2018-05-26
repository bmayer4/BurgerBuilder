import * as actionTypes from './../actions/actionTypes';


const initialState = {
    orders: [],
    loading: false,
    purchased: false,  //for redirect
    error: false
}

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ORDER_BURGER: 
        const newOrder = {
            id: action.orderId,
            ...action.order
        }
            return {
                ...state,
                loading: false,
                orders: [...state.orders, newOrder],  //don't need to do this since fetching new orders every time
                purchased: true
            };
        case actionTypes.ORDER_BURGER_FAILED:
            return {
                ...state,
                loading: false
            };
        case actionTypes.ORDER_BURGER_START_LOAD:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ORDER_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.FETCH_ORDERS_INIT:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDERS:
            return {
                ...state,
                orders: action.orders,
                loading: false,
                error: false
            }
        case actionTypes.FETCH_ORDERS_FAILED:
            return {
                ...state,
                loading: false,
                error: true
            }
        default:
            return state;
    }
}

export default orderReducer;