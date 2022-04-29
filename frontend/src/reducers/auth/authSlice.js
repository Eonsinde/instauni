import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import jwt_decode from 'jwt-decode'
import authService from './authService';

// get user from localStorage
// check to see if auth_token exists else return null
const auth_data = (localStorage.getItem('auth_tokens') !== null) ? JSON.parse(localStorage.getItem('auth_tokens')) : null;
const user_data = (auth_data !== null) ? jwt_decode(auth_data.access) : null;

const initialState = {
    user: user_data, // if no auth_data return null
    auth_tokens: auth_data,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};


export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try{
        return await authService.register(user);
    } catch (error) {
        // handle server errors
        // like already existing email, username and reg_no
        const message = (
            (error.response && error.response.data && error.response.data.reg_no && error.response.data.reg_no[0]) ||
            (error.response && error.response.data && error.response.data.email && error.response.data.email[0]) ||
            (error.response && error.response.data && error.response.data.username && error.response.data.username[0]) 
        );
        
        return thunkAPI.rejectWithValue(message);
    }
});

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try{
        return await authService.login(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.detail);
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    try{
        return await authService.logout();
    } catch (error) { 
        // return thunkAPI.rejectWithValue("Error with registration");
    }
});

// workstuff2022
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            // register
            .addCase(register.pending, state => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })

            // login cases
            .addCase(login.pending, state => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.auth_tokens = action.payload;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })

            // logout case
            .addCase(logout.pending, state => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, state => {
                state.isLoading = false;
                state.auth_tokens = null;
                state.user = null;
                state.message = "Logout Successful";
            })
            .addCase(logout.rejected, state => {
                state.isLoading = false;
                state.isError = true;
                state.message = "Failed to log out";
                state.user = null;
                state.auth_tokens = null;
            })
    }
});


export const { reset } = authSlice.actions;
export default authSlice.reducer;


