import {createStore,applyMiddleware}  from 'redux'
import thunk from 'redux-thunk';
import reducer from './reducers/Reducer'
import {composeWithDevTools} from 'redux-devtools-extension'



let initialState={
  cart:{
    cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[],
    shippingInfo:localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")):{},
  }
}




const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;