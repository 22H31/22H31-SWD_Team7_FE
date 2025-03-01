import { configureStore, createSlice } from "@reduxjs/toolkit";

// Tạo slice cho người dùng
const userSlice = createSlice({
  name: "user",
  initialState: { name: "", email: "", isAuthenticated: false },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.name = "";
      state.email = "";
      state.isAuthenticated = false;
    },
  },
});

// Xuất các action để sử dụng trong component
export const { setUser, logoutUser } = userSlice.actions;

// Tạo store Redux
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
