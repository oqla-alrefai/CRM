// src/redux/slices/faqSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import authAxios from "../../utils/AuthAxios";

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
      .addCase(createFAQ.rejected,  (st, { payload }) => { st.error = payload; });
  },
});

export default faqSlice.reducer;
