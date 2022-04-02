import { REQUEST_NEW_ORDER,REQUEST_NEW_ORDER_SUCCESS,REQUEST_NEW_ORDER_FAIL } from "../constants/OrderConstants";



export const newOrderReducer =(state={},action)=>{
    switch(action.type){
        case REQUEST_NEW_ORDER:
            return{
                ...state,
                loading:true
            };

        

        case REQUEST_NEW_ORDER_FAIL:
            return{
                loading:false,
                error:action.payload
            };
            
        

        case REQUEST_NEW_ORDER_SUCCESS:
            return{
                loading:false,
                order:action.payload
            };
            
        

        default:return state;
    }
}