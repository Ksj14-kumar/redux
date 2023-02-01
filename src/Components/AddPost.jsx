import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddNewPost, postAdd } from '../Redux-toolkit/Store2'

function AddPost() {
    const [title, setTitle]= useState("")
    const [post, setPost]= useState("")
    const [loading, setloading]= useState(false)
    const dispatch= useDispatch()
   
    const ontitleChange=(e)=>setTitle(e.target.value)
    const onInputChange=(e)=>setPost(e.target.value)

    const onsave= [title,post].every(Boolean) && loading===false
    function onSubmit(){
        if(onsave){
            try {
                setloading(true)
                dispatch(AddNewPost({title,body:post})).unwrap() // handle proimise unwrap
                setTitle("")
                setPost("")
                
            } catch (err) {
                console("error is occered",err)
                console.error(err)
            }
            finally{
                setloading(false)

            }
            
        }
    }

    const onAdd= Boolean(title) && Boolean(post)
    return (
        <div>
            <input type="text" onChange={ontitleChange} name="" placeholder='Title...' id=""
            value={title}
            /> <br />
            <input placeholder='Post....' type="text" onChange={onInputChange} 
            value={post}
            /> <br />
            {loading?"loading...":<button onClick={onSubmit}
            disabled={!onAdd}
            >Add</button>}

        </div>
    )
}

export default AddPost