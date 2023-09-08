import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    lecturers: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addLecturer: (state,action) => {
            const lecturer = state.lecturers.find((lecturer) => lecturer._id === action.payload._id)
            if(lecturer){
                lecturer.quantity += action.payload.quantity
            }
            else{
                state.lecturers.push(action.payload)
            }
        },
        removeLecturer: (state,action) => {
            state.lecturers = state.lecturers.filter((lecturer) => lecturer._id !== action.payload._id)
        }
    }
})

export const {addLecturer,removeLecturer,emptyCart,toggleShowCart} = cartSlice.actions
export default cartSlice.reducer 