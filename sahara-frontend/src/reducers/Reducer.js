import {combineReducers}  from 'redux'
import { allProductReducer, productDetailsReducer } from './productReducer';

const reducer= combineReducers({
    products:allProductReducer,
    product:productDetailsReducer,
});


export default reducer;