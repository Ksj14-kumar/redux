import { createSlice, nanoid, legacy_createStore as createStore, createAsyncThunk, applyMiddleware, configureStore } from "@reduxjs/toolkit";
import axios from "axios"


const userInitPost = [

]

const initialPost = {
    posts: userInitPost,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}


export const fetchPost = createAsyncThunk("post/user", async (thunkAPI) => {
    try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10")
        return res.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message)
    }
})

export const AddNewPost= createAsyncThunk("/post/add",async(newPost,thunkAPI)=>{
    try {
        const res= await axios.post("https://jsonplaceholder.typicode.com/posts",newPost)
        return res.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})

export const fetchUser= createAsyncThunk("post/user",async(thunkAPI)=>{
    try {
        const res= await axios.get("https://jsonplaceholder.typicode.com/users")
        return res.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})


const slice = createSlice({
    name: "post",
    initialState: initialPost,
    reducers: {
        postAdd: {
            reducer: (state, action) => {
              
                state.posts.unshift(action.payload)
            },
            prepare: (title, post) => {
                return {
                    payload: {
                        title,
                        id: nanoid(),
                        body: post,
                        reaction: {
                            like: 0,
                            dislike: 0

                        }
                        // userId
                    }
                }
            }
        },
        reactionAdd(state, action) {
            const { postId, react } = action.payload
            const findPost = state.posts.find(item => {
                return item.id === postId
            })
            if (findPost) {
                if (react === "like") {
                    findPost.reaction[react] += 1
                }
                else {

                    findPost.reaction[react] += 1
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPost.pending, (state, action) => {
                state.isLoading = true,
                    state.isSuccess = false
                state.isError = false
            })
            .addCase(fetchPost.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.isSuccess = false
                state.message = action.error.message

            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.message = ""
                const updatePost = action.payload.map((item) => {
                    return {
                        ...item,
                        reaction: {
                            like: 0,
                            dislike: 0
                        }
                    }
                })
                state.posts = [...state.posts, ...updatePost]
            })
            .addCase(AddNewPost.fulfilled,(state, action)=>{
                console.log("new post added",action.payload)
                state.isLoading=false
                action.payload.reaction={
                    like: 0,
                    dislike: 0
                }
                state.posts.unshift(action.payload)
            })
           
    }
})
export const { postAdd, reactionAdd } = slice.actions
export const reducer = slice.reducer;
export const isSelector = (state) => state.post


const userSlice= createSlice({
    name:"user",
    initialState:[],
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUser.fulfilled,(state,action)=>{
            return action.payload
        })
    }
})


const userReducer= userSlice.reducer


const logger = (state) => {
    return function (next) {
        return function (action) {
            next(action)
        }
    }
}
export const store = configureStore({ reducer:{post:reducer,user:userReducer}})