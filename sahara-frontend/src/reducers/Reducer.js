import {combineReducers}  from 'redux'
import { allProductReducer, productDetailsReducer } from './productReducer';
import { userLoginReducer } from './userReducer';

const reducer= combineReducers({
    products:allProductReducer,
    product:productDetailsReducer,
    user:userLoginReducer
});


export default reducer;