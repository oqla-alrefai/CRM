// src/redux/slices/studentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import authAxios from "../../utils/AuthAxios";

// Wait until access_token is available (helps during login/refresh timing)
const getTokenWithRetry = async (retries = 5, delay = 100) => {
  let token = Cookies.get("access_token");
  while (!token && retries > 0) {
    await new Promise((res) => setTimeout(res, delay));
    token = Cookies.get("access_token");
    retries--;
  }
  return token;
};

// 🔹 Fetch Students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const token = await getTokenWithRetry();
      if (!token) return rejectWithValue("No access token");

      const res = await authAxios.get("/students/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch students"
      );
    }
  }
);

// 🔹 Add Student
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (studentData, { rejectWithValue }) => {
    try {
      const token = await getTokenWithRetry();
      if (!token) return rejectWithValue("No access token");

      const res = await authAxios.post("/students/", studentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to add student"
      );
    }
  }
);

// 🔹 Delete Student
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (studentId, { rejectWithValue }) => {
    try {
      const token = await getTokenWithRetry();
      if (!token) return rejectWithValue("No access token");

      await authAxios.delete(`/students/${studentId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return studentId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to delete student"
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
      // 🔸 Fetch Students
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

      // 🔸 Add Student
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
      })

      // 🔸 Delete Student
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (student) => student.id !== action.payload
        );
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { selectStudent, clearAddSuccess } = studentsSlice.actions;
export default studentsSlice.reducer;
