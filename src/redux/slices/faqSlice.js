// src/redux/slices/faqSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import authAxios from "../../utils/AuthAxios";
import { toast } from "react-toastify";

const BASE_URL = "https://isoenrollment.onrender.com/api/faqs/";

/* ────────────────────────────────
   Async thunks
──────────────────────────────────*/
export const fetchFAQs = createAsyncThunk("faq/fetchAll", async (_, thunkAPI) => {
  try {
    const { data } = await authAxios.get(BASE_URL,{
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token") || ""}`,
      },
    });
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.detail || err.message);
  }
});

export const createFAQ = createAsyncThunk("faq/create", async (faq, thunkAPI) => {
  try {
    const token = Cookies.get("access_token");
    if (!token) throw new Error("Missing access token.");

    const { data } = await authAxios.post(BASE_URL, faq, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.detail || err.message);
  }
});

// Async thunk to delete FAQ by ID
export const deleteFaq = createAsyncThunk(
  "faqs/deleteFaq",
  async (faqId, { rejectWithValue }) => {
    try {
      const token = Cookies.get("access_token");
      const response = await axios.delete(
        `https://isoenrollment.onrender.com/api/faqs/${faqId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("FAQ deleted successfully.");
      return faqId;
    } catch (error) {
      toast.error("Failed to delete FAQ.");
      return rejectWithValue(error.response?.data || "Failed to delete FAQ");
    }
  }
);

/* ────────────────────────────────
   Slice
──────────────────────────────────*/
const faqSlice = createSlice({
  name: "faq",
  initialState: {
    faqs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchFAQs
      .addCase(fetchFAQs.pending,   (st) => { st.loading = true;  st.error = null; })
      .addCase(fetchFAQs.fulfilled, (st, { payload }) => { st.loading = false; st.faqs = payload; })
      .addCase(fetchFAQs.rejected,  (st, { payload }) => { st.loading = false; st.error = payload; })

      // createFAQ
      .addCase(createFAQ.pending,   (st) => { st.error = null; }) // keep current loading state
      .addCase(createFAQ.fulfilled, (st, { payload }) => { st.faqs.push(payload); })
      .addCase(createFAQ.rejected,  (st, { payload }) => { st.error = payload; })

      // deleteFaq
      
      .addCase(deleteFaq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFaq.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = state.faqs.filter((faq) => faq.id !== action.payload);
      })
      .addCase(deleteFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default faqSlice.reducer;
