import {combineReducers}  from 'redux'
import { allProductReducer, productDetailsReducer } from './productReducer';
import { updateUserProfileReducer, userLoginReducer } from './userReducer';
import { userAddCartReducer } from './cartReducer';
import { newOrderReducer } from './orderReducer';

const reducer= combineReducers({
    products:allProductReducer,
    product:productDetailsReducer,
    user:userLoginReducer,
    profile:updateUserProfileReducer,
    cart:userAddCartReducer,
    order:newOrderReducer
});


export default reducer;