import { REQUEST_NEW_ORDER,REQUEST_NEW_ORDER_SUCCESS,REQUEST_NEW_ORDER_FAIL } from "../constants/OrderConstants";

import axios from 'axios'

export const newOrder=(orderData)=>async(dispatch,getState)=>{
    try{
        dispatch({type:REQUEST_NEW_ORDER})

        const {data}=await axios.post("/api/v1/order/new",orderData)

        dispatch({type:REQUEST_NEW_ORDER_SUCCESS,payload:data})
    }
    catch(error){
        dispatch({type:REQUEST_NEW_ORDER_FAIL,payload:error.response.data.message})
    }

}