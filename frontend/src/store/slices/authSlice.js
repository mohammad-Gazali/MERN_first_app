import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";


//* Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"))


const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}


//* Register user
export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
            console.log(error)
            console.log(error.toString())
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            console.log(message)
            return thunkAPI.rejectWithValue(message)          
        }
    }
)

//* Login user
export const login = createAsyncThunk(
    "auth/login",
    async (user, thunkAPI) => {
        try {
            return await authService.login(user)
        } catch (error) {
            console.log(error)
            console.log(error.toString())
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            console.log(message)
            return thunkAPI.rejectWithValue(message)          
        }
    }
) 


//* Logout user
export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        localStorage.clear()
    }
)


const authSlice = createSlice({
    
    initialState,
    
    name: "auth",
    
    reducers: {
        reset: (state, action) => {
            state.isLoading = false,
            state.isError = false,
            state.isSuccess = false,
            state.message = ''
        }
    },

    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action) => {
            state.isLoading = true;
        })

        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })  

        builder.addCase(register.rejected,  (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        })

        builder.addCase(logout.fulfilled, (state, action) => {
            state.user = null;
        })

        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true;
        })

        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })  

        builder.addCase(login.rejected,  (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        })
    }

})


export default authSlice.reducer
export const { reset } = authSlice.actions 