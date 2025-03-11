import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  type: string | null;
  content: unknown | null;
}

export const modalTypes = {
  addTeam: "add-team",
};

const initialState: ModalState = {
  isOpen: false,
  type: null,
  content: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openAddTeam(state, action) {
      state.isOpen = true;
      state.type = modalTypes.addTeam;
      state.content = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
      state.content = null;
    },
  },
});

export const { openAddTeam, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
