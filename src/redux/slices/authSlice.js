import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../utils/AuthAxios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const accessToken = Cookies.get("access_token");

let decodedUser = null;
if (accessToken) {
  try {
    const decoded = jwtDecode(accessToken);

    decodedUser = {
      id: decoded.user_id,
      username: decoded.username,
      is_superuser: decoded.is_superuser || false,
      email: decoded.email || null,
    };
  } catch (err) {
    console.error("Invalid token", err);
  }
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://isoenrollment.onrender.com/api/token/',
        { username, password }
      );

      const { refresh, access } = response.data;

      // Save tokens to cookies
      Cookies.set('access_token', access, { expires: 1 });   // Expires in 1 day
      Cookies.set('refresh_token', refresh, { expires: 7 }); // Expires in 7 days

      return { access, refresh, username }; // you can add more user info if available
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  }
);

const initialState = {
  user: decodedUser,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.user = { username: action.payload.username };
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
