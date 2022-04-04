import {
    REQUEST_NEW_ORDER, REQUEST_NEW_ORDER_SUCCESS, REQUEST_NEW_ORDER_FAIL
    , REQUEST_USER_ORDERS, REQUEST_USER_ORDERS_FAIL, REQUEST_USER_ORDERS_SUCCESS,
    REQUEST_USER_ORDER_DETAIL, REQUEST_USER_ORDER_DETAIL_FAIL, REQUEST_USER_ORDER_DETAIL_SUCCESS,
    REQUEST_ALL_ORDER_ADMIN, REQUEST_ALL_ORDER_ADMIN_SUCCESS, REQUEST_ALL_ORDER_ADMIN_FAIL
} from "../constants/OrderConstants";



export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_NEW_ORDER:
            return {
                ...state,
                loading: true
            };



        case REQUEST_NEW_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            };



        case REQUEST_NEW_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            };



        default: return state;
    }
}


export const getUserOrderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case REQUEST_USER_ORDERS:
            return {
                loading: true
            };



        case REQUEST_USER_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            };



        case REQUEST_USER_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.order
            };



        default: return state;
    }

}


export const getAllOrderAdminReducer = (state = { }, action) => {
    switch (action.type) {
        case REQUEST_ALL_ORDER_ADMIN:
            return {
                loading: true
            };



        case REQUEST_ALL_ORDER_ADMIN_FAIL:
            return {
                loading: false,
                error: action.payload
            };



        case REQUEST_ALL_ORDER_ADMIN_SUCCESS:
            return {
                loading: false,
                order: action.payload.order
            };



        default: return state;
    }

}


export const getUserOrderDetailsReducer = (state = { order: [] }, action) => {
    switch (action.type) {
        case REQUEST_USER_ORDER_DETAIL:
            return {
                loading: true
            };



        case REQUEST_USER_ORDER_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            };



        case REQUEST_USER_ORDER_DETAIL_SUCCESS:
            return {
                loading: false,
                order: action.payload.order
            };



        default: return state;
    }

}