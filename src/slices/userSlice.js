import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState =  {
    users: [],
    isLoading: false,
    error: null,
    isSnackbarOpen: false,
    snackbarMessage: "", 
    userById: {}
    
    

}

export const getUsers= createAsyncThunk(
    "getUsers",
    async () => {
        try {
            const response = await axios.get("https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/tasks")
            return response.data
        } catch (error) {
            return error.response.data
        }  
    },
)

export const deleteUsers = createAsyncThunk(
    "deleteUsers",
async (id) => {
    try {
        const response = await axios.delete(`https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/tasks/${id}`)
        return id
    } catch (error) {
        return error.response.data
    }
}
)

export const addUsers = createAsyncThunk("addUsers", async (newUser) => {
  try {
    const res = await axios.post("https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/tasks", newUser);
    return res.data;
  } catch (error) {
    return error.message;
  }
});




export const getUserById = createAsyncThunk(
  "getUserByid",
  async (id) => {
      try {
          const res = await axios.get(`https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/tasks/${id}`)
          const data = res.data
          return data
         } 
      
     catch (error) {
      return error.message;
    }
  }
);

export const updateUsers = createAsyncThunk(
    "updateUsers",
    async ({ id, ...updatedUser },thunkApi) => {
        console.log(id)
        try {
            await axios.put(`https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/tasks/${id}`, updatedUser);
            thunkApi.dispatch(getUsers())
            return { id, updatedUser };
        } catch (error) {
            return error.message;
        }
    }
);



export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        closeSnackbar: (state) => {
            state.isSnackbarOpen = false;
            state.snackbarMessage = "";
        },
    },
    extraReducers: (builder) => {

        // GET

        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
                
            });

        builder.addCase(getUsers.rejected, (state) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            });
            
        // Delete
        builder.addCase(deleteUsers.fulfilled, (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
            state.isSnackbarOpen = true;
            state.snackbarMessage = `İstifadəçi silindi:  ${action.payload}`;
        })
        builder.addCase(deleteUsers.rejected, (state, action) => {
            state.error = action.payload?.message;
        });
        
        // Add
        builder.addCase(addUsers.fulfilled, (state, action) => {
            state.users.push(action.payload);
            state.isSnackbarOpen = true;
            state.snackbarMessage = `İstifadəçi yaradıldı:  ${action.payload.name}`;
        });
        builder.addCase(addUsers.rejected, (state, action) => {
            state.error = action.payload?.message
        });
        
        //getUserByİD
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.userById = action.payload

        })


    
        builder.addCase(getUserById.rejected, (state, action) => {
            state.error = action.payload?.message;
            });
            }
        })

export default userSlice.reducer
export const { closeSnackbar } = userSlice.actions


