import axios from "axios"
import {
    REQUEST_FOR_ADD_TO_CART_FAIL, REQUEST_FOR_ADD_TO_CART_SUCCESS,
    REQUEST_TO_REMOVE_FROM_CART
} from "../constants/CartConstants"


export const userAddToCart = (id, count) => async (dispatch,getState) => {
    try {
        const { data } = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type: REQUEST_FOR_ADD_TO_CART_SUCCESS,
            payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                inStock:data.product.inStock,
                image: "https://res.cloudinary.com/dbunwmh8z/image/upload/v1648531024/samples/ecommerce/accessories-bag.jpg",
                count,
            }
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    }
    catch (error) {
        dispatch({
            type: REQUEST_FOR_ADD_TO_CART_FAIL,
            payload: error.response.data.message
        })
    }
}


export const deleteFromCart =(id)=>async(dispatch,getState)=>{
    dispatch({type:REQUEST_TO_REMOVE_FROM_CART,payload:id})

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}