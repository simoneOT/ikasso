import { createSlice } from '@reduxjs/toolkit'

export const imageredux = createSlice({
  name: 'img',
  initialState:{
    image:[]
  },
  reducers: {
    image: (state, action) => {
      state.image=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { image} = imageredux.actions

export default image.reducer