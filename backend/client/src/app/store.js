
import { configureStore} from '@reduxjs/toolkit'
import dateReducer from '../Component/redux/slice/dateredux'
import users from '../Component/redux/slice/user.redux'

export default configureStore({
  reducer: {
        counter: dateReducer, users
  },
})