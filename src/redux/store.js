import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './slices/studentsSlice';
import authReducer from './slices/authSlice';
import faqReducer from './slices/faqSlice';
import achievementsReducer from './slices/achievementsSlice';
import programsReducer from './slices/programsSlice';
import staffReducer from './slices/staffSlice';

export default configureStore({
  reducer: {
    students: studentsReducer,
    auth: authReducer,
    faq: faqReducer,
    achievements: achievementsReducer,
    programs: programsReducer,
    staff: staffReducer,
  },
});
