import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'date',
  initialState:{
    date:{}
  },
  reducers: {
    getdate: (state, action) => {
      state.date = action.payload
    },
    daletegetdate: (state) => {
      state.date=""
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getdate, daletegetdate, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer