import {createStore,applyMiddleware}  from 'redux'
import thunk from 'redux-thunk';
import reducer from './reducers/Reducer'
import {composeWithDevTools} from 'redux-devtools-extension'



let initialState={}




const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;