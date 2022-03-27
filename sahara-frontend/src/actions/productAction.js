import axios from 'axios'

import {
    REQUEST_FOR_ALL_PRODUCTS, REQUEST_FOR_ALL_PRODUCTS_SUCCESS,
    REQUEST_FOR_ALL_PRODUCTS_FAIL, CLEAR_ERROR, REQUEST_FOR_PRODUCTS_DETAILS,
    REQUEST_FOR_PRODUCTS_DETAILS_FAIL, REQUEST_FOR_PRODUCTS_DETAILS_SUCCESS
} from "../constants/ProductConstants"


export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_FOR_ALL_PRODUCTS })

        const { data } = await axios.get("/api/v1/products/all")

        dispatch({ type: REQUEST_FOR_ALL_PRODUCTS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: REQUEST_FOR_ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }

}


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_FOR_PRODUCTS_DETAILS })

        const { data } = await axios.get(`/api/v1/product/${id}`)

        dispatch({
             type: REQUEST_FOR_PRODUCTS_DETAILS_SUCCESS, 
             payload: data.product 
            })

    } catch (error) {
        dispatch({
            type: REQUEST_FOR_PRODUCTS_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }

}

export const clearErrors = () => async (dispatch) => {
     dispatch({type:CLEAR_ERROR})

}