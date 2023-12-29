import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from './features/slices/employeeSlice'
import viewReducer from './features/slices/toggleViewSlice';


export function storeValues() {
    return configureStore({
        reducer: {
            employee : employeeReducer,
            view : viewReducer
        }
    })
}


export const store = storeValues()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch