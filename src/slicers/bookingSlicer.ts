import { createSlice } from '@reduxjs/toolkit'
import { Booking } from '../types'

const bookings: Booking[] = []
const currentBooking: Booking | null = null

let id = 1
export const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookings,
    currentBooking,
  },
  reducers: {
    addBooking: (state, action) => {
      id++
      state.bookings.push({ ...action.payload, id })
    },
    deleteBooking: (state, action) => {
      state.bookings = state.bookings.filter((booking) => booking.id !== action.payload.id)
    },
    editBooking: (state, action) => {
      state.currentBooking = action.payload
    },
    saveBooking: (state, action) => {
      const idx = state.bookings.findIndex((booking) => booking.id === action.payload.id)
      const newValue = {
        ...state.bookings[idx],
        ...action.payload,
      }

      state.bookings[idx] = newValue
      state.currentBooking = null
    },
  },
})

export const { addBooking, deleteBooking, editBooking, saveBooking } = bookingSlice.actions

export default bookingSlice.reducer
