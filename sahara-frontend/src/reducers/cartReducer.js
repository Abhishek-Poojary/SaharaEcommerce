import { REQUEST_FOR_ADD_TO_CART_FAIL, REQUEST_FOR_ADD_TO_CART_SUCCESS } from "../constants/CartConstants";



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


        default: return state;

    }
}