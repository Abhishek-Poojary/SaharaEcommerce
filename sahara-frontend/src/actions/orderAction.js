import {
    REQUEST_NEW_ORDER, REQUEST_NEW_ORDER_SUCCESS, REQUEST_NEW_ORDER_FAIL,
    REQUEST_USER_ORDERS, REQUEST_USER_ORDERS_FAIL, REQUEST_USER_ORDERS_SUCCESS,
    REQUEST_USER_ORDER_DETAIL,REQUEST_USER_ORDER_DETAIL_FAIL,REQUEST_USER_ORDER_DETAIL_SUCCESS
} from "../constants/OrderConstants";

import axios from 'axios'

export const newOrder = (orderData) => async (dispatch, getState) => {
    try {
        dispatch({ type: REQUEST_NEW_ORDER })

        const { data } = await axios.post("/api/v1/order/new", orderData)

        dispatch({ type: REQUEST_NEW_ORDER_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: REQUEST_NEW_ORDER_FAIL, payload: error.response.data.message })
    }

}


export const getUserOrders = () => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_USER_ORDERS })

        const { data } = await axios.get("/api/v1/orders/me")

        dispatch({ type: REQUEST_USER_ORDERS_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: REQUEST_USER_ORDERS_FAIL, payload: error })
    }
}



export const getUserOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_USER_ORDER_DETAIL })

        const { data } = await axios.get(`/api/v1/order/${id}`)

        dispatch({ type: REQUEST_USER_ORDER_DETAIL_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: REQUEST_USER_ORDER_DETAIL_FAIL, payload: error })
    }
}