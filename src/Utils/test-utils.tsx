import React, { PropsWithChildren } from 'react'
import { RenderOptions, render } from '@testing-library/react'
import { PreloadedState, configureStore } from '@reduxjs/toolkit'
import bookingSlice from '../slicers/bookingSlicer'
import { RootState } from '../store'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: any
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      booking: {
        bookings: [],
        currentBooking: null,
      },
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { booking: bookingSlice }, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <ConfigProvider>{children}</ConfigProvider>
      </Provider>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
