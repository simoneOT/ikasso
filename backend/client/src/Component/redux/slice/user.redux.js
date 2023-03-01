import { createSlice } from '@reduxjs/toolkit'

export const users = createSlice({
  name: 'users',
  initialState:{
    users:[]
  },
  reducers: {
    userId: (state, action) => {
      state.users=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { userId} = users.actions

export default users.reducer