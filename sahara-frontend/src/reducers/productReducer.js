import {
    REQUEST_FOR_ALL_PRODUCTS, REQUEST_FOR_ALL_PRODUCTS_SUCCESS,
    REQUEST_FOR_ALL_PRODUCTS_FAIL, CLEAR_ERROR, REQUEST_FOR_PRODUCTS_DETAILS,
    REQUEST_FOR_PRODUCTS_DETAILS_FAIL, REQUEST_FOR_PRODUCTS_DETAILS_SUCCESS,
    REQUEST_ALL_PRODUCT_ADMIN, REQUEST_ALL_PRODUCT_ADMIN_FAIL, REQUEST_ALL_PRODUCT_ADMIN_SUCCESS
} from "../constants/ProductConstants"

export const allProductReducer = (state = { products: [] }, action) => {

    switch (action.type) {
        case REQUEST_ALL_PRODUCT_ADMIN:
        case REQUEST_FOR_ALL_PRODUCTS:
            return {
                loading: true,
                products: [],
            }
        case REQUEST_ALL_PRODUCT_ADMIN_FAIL:
        case REQUEST_FOR_ALL_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case REQUEST_FOR_ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.totalProducts,
                limitNumberOfPages: action.payload.limitNumberOfPages
            }
        case REQUEST_ALL_PRODUCT_ADMIN_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };

        default: return state;

    }

}


export const productDetailsReducer = (state = { product: [] }, action) => {

    switch (action.type) {
        case REQUEST_FOR_PRODUCTS_DETAILS:
            return {
                ...state,
            }
        case REQUEST_FOR_PRODUCTS_DETAILS_FAIL:
            return {
                error: action.payload,
            }
        case REQUEST_FOR_PRODUCTS_DETAILS_SUCCESS:
            return {
                product: action.payload
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default: return state;
    }
}



