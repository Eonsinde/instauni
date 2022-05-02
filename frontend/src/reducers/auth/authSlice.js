import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import jwt_decode from 'jwt-decode'
import authService from './authService';

// get user from localStorage
// check to see if auth_token exists else return null
const auth_data = (localStorage.getItem('auth_tokens') !== null) ? JSON.parse(localStorage.getItem('auth_tokens')) : null;
const user_data = (auth_data !== null) ? jwt_decode(auth_data.access) : null;
const token_refresh = (auth_data !== null) ? true : false;

const initialState = {
    user: user_data, // if no auth_data return null
    auth_tokens: auth_data,
    tokenRefreshing: token_refresh,
    tokenRefreshError: false,
    isError: false,
    loginSuccess: false,
    registerSuccess: false,
    logoutSuccess: false,
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
            (error.response && error.response.data && error.response.data.username && error.response.data.username[0]) ||
            (error.response && error.response.data && error.response.data.level && `Level: ${error.response.data.level[0]}`) ||
            (error && String(error) === "Error: Network Error" && "Try Again: Network Issues")
        );
        
        return thunkAPI.rejectWithValue(message);
    }
});

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try{
        return await authService.login(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.detail) || 
                        (error && String(error) === "Error: Network Error" && "Try Again: Network Issues");
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateToken = createAsyncThunk('auth/refresh-token', async (data, thunkAPI) => {
    try{
        return await authService.updateToken();
    } catch (error) {
        console.log("Update Token Failed: " + error);
        const message = (error.response && error.response.data && error.response.data.detail) || 
                        (error && (String(error) === "Error: Network Error") && "Try Again: Network Issues with refreshing token") ||
                        (error && (String(error) === "Error: Request failed with status code 401") && "Failed to refresh token")
        thunkAPI.dispatch(logout()); // logout incase of errors in refreshing token
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
            state.loginSuccess = false;
            state.registerSuccess = false;
            state.logoutSuccess = false;
            state.isLoading = false;
            state.tokenRefreshError = false;
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
                state.registerSuccess = true;
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
                state.loginSuccess = true;
                state.auth_tokens = { refresh: action.payload.refresh, access: action.payload.access };
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })

            // updateToken cases
            .addCase(updateToken.pending, state => {
                state.tokenRefreshing = true;
            })
            .addCase(updateToken.fulfilled, (state, action) => {
                state.tokenRefreshing = false;
                state.auth_tokens = { refresh: action.payload.refresh, access: action.payload.access };
                state.user = action.payload.user;
            })
            .addCase(updateToken.rejected, (state, action) => {
                state.tokenRefreshing = false;
                state.tokenRefreshError = true;
                state.message = action.payload;
            })

            // logout case
            .addCase(logout.pending, state => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, state => {
                state.isLoading = false;
                state.auth_tokens = null;
                state.logoutSuccess = true;
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


