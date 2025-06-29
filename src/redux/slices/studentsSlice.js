import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { refreshAccessToken } from "../../utils/authHelpers";
import authAxios from "../../utils/AuthAxios";
// Helper to wait until token is ready (handles timing issues)
const getTokenWithRetry = async (retries = 5, delay = 100) => {
  let token = Cookies.get("access_token");
  while (!token && retries > 0) {
    await new Promise((res) => setTimeout(res, delay));
    token = Cookies.get("access_token");
    retries--;
  }
  return token;
};

// Fetch students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const token = await getTokenWithRetry();
      if (!token) return rejectWithValue("No access token");
      
      const response = await authAxios.get(
        "https://isoenrollment.onrender.com/api/students/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched students:", response.data);
      
      return response.data; // assuming single student wrapped in array
    }  catch (error) {
      if (error.response?.status === 401) {
        try {
          token = await refreshAccessToken();
          const retryResponse = await authAxios.get(
            "https://isoenrollment.onrender.com/api/students/",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          return retryResponse.data;
        } catch (refreshError) {
          return rejectWithValue("Session expired. Please log in again.");
        }
      }

      return rejectWithValue("Failed to fetch students");
    }
  }
);

// Add student
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (studentData, { rejectWithValue }) => {
    try {
      const token = await getTokenWithRetry();
      if (!token) return rejectWithValue("No access token");

      const response = await authAxios.post(
        "https://isoenroll-test.onrender.com/api/students/",
        studentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to add student"
      );
    }
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    loading: false,
    error: null,
    selectedStudent: null,
    addSuccess: false,
  },
  reducers: {
    selectStudent(state, action) {
      state.selectedStudent = action.payload;
    },
    clearAddSuccess(state) {
      state.addSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add student
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.addSuccess = false;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload);
        state.addSuccess = true;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.addSuccess = false;
      });
  },
});

export const { selectStudent, clearAddSuccess } = studentsSlice.actions;
export default studentsSlice.reducer;
