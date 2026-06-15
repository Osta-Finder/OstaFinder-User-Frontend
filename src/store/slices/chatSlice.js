import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  messages: [],
  isLoading: false,
  pendingMessage: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    openChat: (state) => {
      state.isOpen = true;
    },
    closeChat: (state) => {
      state.isOpen = false;
    },
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setPendingMessage: (state, action) => {
      state.pendingMessage = action.payload;
    },
    clearPendingMessage: (state) => {
      state.pendingMessage = null;
    },
  },
});

export const { openChat, closeChat, toggleChat, addMessage, setLoading, clearMessages, setPendingMessage, clearPendingMessage } = chatSlice.actions;
export default chatSlice.reducer;
