import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: { savedData: [], allData: [] },
  reducers: {
    setAllData: (state, action) => {
      state.allData = action.payload;
    },
    setSavedData: (state, action) => {
      state.savedData = [...state.savedData, action.payload];
    },
    deleteSavedData: (state, action) => {
      state.savedData = state.savedData.filter(
        (item) => item.symbol !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSavedData, setAllData, deleteSavedData } = appSlice.actions;

export default appSlice.reducer;
