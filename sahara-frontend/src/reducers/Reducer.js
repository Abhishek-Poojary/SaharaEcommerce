import {combineReducers}  from 'redux'
import { allProductReducer, productDetailsReducer } from './productReducer';
import { updateUserProfileReducer, userLoginReducer } from './userReducer';

const reducer= combineReducers({
    products:allProductReducer,
    product:productDetailsReducer,
    user:userLoginReducer,
    profile:updateUserProfileReducer
});


export default reducer;