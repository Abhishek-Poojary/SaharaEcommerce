import {combineReducers}  from 'redux'
import { allProductReducer, createProductReducer, productDetailsReducer,updateProductReducer,deleteProductReducer } from './productReducer';
import { updateUserProfileReducer, userLoginReducer ,allUsersAdminReducer, userAdminReducer } from './userReducer';
import { userAddCartReducer } from './cartReducer';
import { newOrderReducer ,getUserOrderReducer ,getUserOrderDetailsReducer ,getAllOrderAdminReducer,processOrderReducer} from './orderReducer';

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
    createProduct:createProductReducer,
    updateProduct:updateProductReducer,
    deleteProduct:deleteProductReducer,
    processOrder:processOrderReducer,
    adminUser:userAdminReducer
});


export default reducer;