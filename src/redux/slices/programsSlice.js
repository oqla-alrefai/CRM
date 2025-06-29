import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  programs: [
    { id: 1, name: "Information Technology", description: "Learn coding, networks, and more." },
    { id: 2, name: "Business", description: "Entrepreneurship, marketing, and finance." },
    { id: 3, name: "Engineering", description: "Hands-on learning in multiple fields." },
    { id: 4, name: "Art & Design", description: "Express your creativity in various media." },
    // Add more as needed
  ],
};

const programsSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
    addProgram(state, action) {
      state.programs.push(action.payload);
    },
  },
});

export const { addProgram } = programsSlice.actions;
export default programsSlice.reducer;
