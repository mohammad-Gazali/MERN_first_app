import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "../services/goalService";


//* Create New Goal
export const createGoal = createAsyncThunk(
    "goals/create",
    async (text, thunkAPI) => {
        try {

            //? thunkAPI has a method called getState() that make us able to get any state from our global state (Redux's store)
            const token = await thunkAPI.getState().auth.user.token 
        
            return await goalService.createGoal(text, token)
        
        } catch (error) {
            console.log(error)
            console.log(error.toString())
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            console.log(message)
            return thunkAPI.rejectWithValue(message)          
        }
    }
)


//* Get User Goals
export const getGoals = createAsyncThunk(
    "goals/getAll",
    async (_, thunkAPI) => {
        try {
            
            const token = thunkAPI.getState().auth.user.token 
        
            return await goalService.getGoals(token)
        
        } catch (error) {
            console.log(error)
            console.log(error.toString())
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            console.log(message)
            return thunkAPI.rejectWithValue(message)          
        }
    }
)


//* Delete Goal
export const deleteGoal = createAsyncThunk(
    "goals/delete",
    async (id, thunkAPI) => {
        try {
            
            const token = thunkAPI.getState().auth.user.token 
        
            return await goalService.removeGoal(id, token)
        
        } catch (error) {
            console.log(error)
            console.log(error.toString())
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            console.log(message)
            return thunkAPI.rejectWithValue(message)          
        }
    }
)


const initialState = {
    goals: [], 
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const goalSlice = createSlice({
    name: "goals",
    initialState, 
    reducers: {
        reset: (state, action) => initialState
    },
    extraReducers: (builder) => {
        //* Create Goal
        builder.addCase(createGoal.pending, (state, action) => {
            state.isLoading = true;
        })
        
        builder.addCase(createGoal.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.goals.push(action.payload)
        })

        builder.addCase(createGoal.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload    
        })

        //* Get All Goals
        builder.addCase(getGoals.pending, (state, action) => {
            state.isLoading = true;
        })
        
        builder.addCase(getGoals.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.goals = action.payload
        })

        builder.addCase(getGoals.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload    
        })

        //* Delete Goal
        builder.addCase(deleteGoal.pending, (state, action) => {
            state.isLoading = true;
        })
        
        builder.addCase(deleteGoal.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.goals = state.goals.filter(goal => goal._id !== action.payload.id)
        })

        builder.addCase(deleteGoal.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload    
        })
    }
})


export default goalSlice.reducer;
export const { reset } = goalSlice.actions;