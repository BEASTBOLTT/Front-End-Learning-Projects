import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState: {
    value: 0,
  },
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      state.paste.push(paste);
      localStorage.setItem("pastes", state.pastes);
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