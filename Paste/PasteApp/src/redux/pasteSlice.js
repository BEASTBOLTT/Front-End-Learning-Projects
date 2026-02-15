import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    pastes: localStorage.getItem("paste")
    ? JSON.parse(localStorage.getItem("paste"))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState: {
    value: 0,
  },
  reducers: {
    addToPaste: (state, action) => {
      
    },
    updateToPaste: (state, action) => {
      
        
    },
    resetAllPaste: (state, action) => {
      
    },
    removeAllPaste: (state, action) => {
      
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetAllPaste } = pasteSlice.actions

export default pasteSlice.reducer 