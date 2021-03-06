import {
    REQUEST_FOR_ADD_TO_CART_FAIL, REQUEST_FOR_ADD_TO_CART_SUCCESS
    , REQUEST_TO_REMOVE_FROM_CART,
    REQUEST_TO_SAVE_SHIPPING_INFO
} from "../constants/CartConstants";



export const userAddCartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case REQUEST_FOR_ADD_TO_CART_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case REQUEST_FOR_ADD_TO_CART_SUCCESS:

            const itemToBeAdded = action.payload;

            const CheckIfItemExistInCart = state.cartItems.find(
                (item) => item.product === itemToBeAdded.product
            )
            if (CheckIfItemExistInCart) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(
                        (item) => item.product === CheckIfItemExistInCart.product ? itemToBeAdded : item
                    ),

                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, itemToBeAdded]
                }
            }
        case REQUEST_TO_REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.product !== action.payload),
            }


        case REQUEST_TO_SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo:action.payload
            }
        default: return state;

    }
}