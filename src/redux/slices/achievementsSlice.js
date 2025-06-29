import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  achievements: [
    { id: 1, studentName: "Ali Ahmad", title: "Won IT Olympiad", major: "IT" },
    { id: 2, studentName: "Lina Saleh", title: "National Art Award", major: "Art & Design" },
    { id: 3, studentName: "Khaled Omar", title: "Business Plan Winner", major: "Business" },
    // Add more as needed
  ],
};

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    addAchievement(state, action) {
      state.achievements.push(action.payload);
    },
  },
});

export const { addAchievement } = achievementsSlice.actions;
export default achievementsSlice.reducer;
