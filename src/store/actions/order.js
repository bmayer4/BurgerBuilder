import * as actionTypes from './actionTypes';
import axios from 'axios';


//----SINGLE ORDER-----

export const orderInit = () => {
    return {
        type: actionTypes.ORDER_INIT
    }
}

export const orderBurger = (id, order) => {
    return {
        type: actionTypes.ORDER_BURGER,
        orderId: id,
        order: order
    }
}

export const orderBurgerFailed = () => {
    return {
        type: actionTypes.ORDER_BURGER_FAILED
    }
}

export const orderBurgerStartLoad = () => {
    return {
        type: actionTypes.ORDER_BURGER_START_LOAD
    }
}

export const startOrderBurger = (order, token) => {
    return (dispatch, getState) => {
        dispatch(orderBurgerStartLoad());     //auth= part of firebase
        axios.post(`https://react-burger-f4fb7.firebaseio.com/orders.json?auth=${token}`, order).then((response) => {
            dispatch(orderBurger(response.data.name, order))
        }).catch((e) => {
            dispatch(orderBurgerFailed());
        })
    }
}


//----ALL ORDERS-----

export const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrders = (fetchedOrders) => {
return {
    type: actionTypes.FETCH_ORDERS,
    orders: fetchedOrders
    }
}

export const startFetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersInit());
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        axios.get(`https://react-burger-f4fb7.firebaseio.com/orders.json${queryParams}`).then((response) => {
        const fetchedOrders = [];
        console.log(response.data);
        for (let key in response.data) {
            fetchedOrders.push({
                id: key,
                ...response.data[key]
            })
        }
            dispatch(fetchOrders(fetchedOrders));
        }).catch((e) => {
            dispatch(fetchOrdersFailed(e));
        })
    }
}