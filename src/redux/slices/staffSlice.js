import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  staff: [
    { id: 1, name: "Ahmad Al-Sharif", position: "Principal", bio: "Experienced educator and leader." },
    { id: 2, name: "Sara Khalil", position: "IT Teacher", bio: "Passionate about tech and teaching." },
    // Add more staff as needed
  ],
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    addStaff(state, action) {
      state.staff.push(action.payload);
    },
  },
});

export const { addStaff } = staffSlice.actions;
export default staffSlice.reducer;
