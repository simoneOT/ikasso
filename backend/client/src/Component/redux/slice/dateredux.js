import { createSlice } from '@reduxjs/toolkit'

export const dateredux = createSlice({
  name: 'dateredux',
  initialState:{
    date: {},
    reservation:{}
  },
  reducers: {
    getdate: (state, action) => {
      state.date = action.payload
    },
    daletegetdate: (state) => {
      state.date = ""
    },
    datareservation: (state, action) => {
      state.reservation= action.payload
    },
    updatereservation: (state, action) => {
        state.date=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getdate, daletegetdate, datareservation, updatereservation } = dateredux.actions

export default dateredux.reducer