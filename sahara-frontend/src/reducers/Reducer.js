import {combineReducers}  from 'redux'
import { allProductReducer, createProductReducer, productDetailsReducer } from './productReducer';
import { updateUserProfileReducer, userLoginReducer ,allUsersAdminReducer } from './userReducer';
import { userAddCartReducer } from './cartReducer';
import { newOrderReducer ,getUserOrderReducer ,getUserOrderDetailsReducer ,getAllOrderAdminReducer} from './orderReducer';

const reducer= combineReducers({
    products:allProductReducer,
    product:productDetailsReducer,
    user:userLoginReducer,
    profile:updateUserProfileReducer,
    cart:userAddCartReducer,
    order:newOrderReducer,
    userOrders:getUserOrderReducer,
    orderDetails:getUserOrderDetailsReducer,
    adminAllOrders:getAllOrderAdminReducer,
    adminAllUsers:allUsersAdminReducer,
    createProduct:createProductReducer
});


export default reducer;