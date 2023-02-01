import {applyMiddleware, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import {combineReducers, legacy_createStore as createStore} from "redux"
const init= {
    value:0
}



export const getPosts= createAsyncThunk("post/user",(id,thunkAPI )=>{
    try {
        const res= axios.get("https://jsonplaceholder.typicode.com/todos/")
        return res.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})




const slicer= createSlice({
    name:"counter",
    initialState:init,
    reducers:{
        increament:(state, action)=>{
            state.value+=action.payload
            return state
        },
        decreament:(state, action)=>{
            state.value-=action.payload
            return state
            
        },
        reset:(state)=>{
            state=0
            return state
        }
    }
})
export const {increament, decreament,reset}= slicer.actions;
export const sliceReducer= slicer.reducer;
const logger = (state)=>{
    return function(next){
        return function(action){
            next(action)
        }
    }
}


const user= createSlice({
    name:"info",
    initialState:{name:"Sanju"},
    reducers:{
        changeName:(state, action)=>{
            state.name= action.payload
            return state
        }
    },
    
})
export const {changeName}= user.actions;
const userReducers= user.reducer;


const rootreducer=combineReducers({r1:sliceReducer,r2:userReducers}) 
export const store= createStore(rootreducer, applyMiddleware(logger))
