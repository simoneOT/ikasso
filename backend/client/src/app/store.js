
import { configureStore} from '@reduxjs/toolkit'
import dateReducer from '../Component/redux/slice/dateredux'
import users from '../Component/redux/slice/user.redux'
import storage  from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import {persistReducer, persistStore } from'redux-persist'
import thunk from 'redux-thunk'

const persistconfig = {
  key: 'root',
  storage,
  whitelist:['dateRedux']
  
}
const rootReducer = combineReducers({
  dateRedux: dateReducer,
})
const persisteReducer = persistReducer(persistconfig, rootReducer)
const store = configureStore({
  reducer: persisteReducer,
  middleware:[thunk],
})
const persistor = persistStore(store)
export default store
export {persistor }