import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPost, isSelector, reactionAdd } from "../Redux-toolkit/Store2"

function Post({ postlist }) {
    const [onlaoding, setOnloading] = useState(false)
    const [onError, setOnError] = useState(false)
    const [onPost, setOnPost] = useState([])

    const dispatch = useDispatch()

    const { posts, isError, isLoading, isSuccess, message } = useSelector(isSelector)
    // useEffect(() => {
    //     if(isLoading){
    //         setOnloading(true)
    //     }
    //     if(isError){
    //         console.log("something error occured...")
    //         setOnError(true)
    //         setOnloading(false)
    //     }
    //     if(isSuccess){
    //         setOnError(false)
    //         setOnloading(false)
    //         setOnPost(posts)
    //         console.log("isSuccess")
    //     }
    //     dispatch(fetchPost())
    // }, [posts,dispatch])

    if (isError) {
        return (
            <>
                something error occured
            </>
        )
    }



    function onGet() {
        dispatch(fetchPost())
    }
    return (
        <>


            {<button onClick={onGet}>Get</button>}

            {
                isLoading ? "loading..." : posts.map((item, index) => {
                    return (
                        <>
                            <div key={index} className="post_container">
                                <h3>{item.title}</h3>
                                <p>{item.body}</p>
                                <p>{item.name}</p>
                                <p onClick={() => {
                                    dispatch(reactionAdd({ postId: item.id, react: "like" }))
                                }}>like: {item.reaction.like}</p>
                                <i
                                    onClick={() => {
                                        dispatch(reactionAdd({ postId: item.id, react: "dislike" }))
                                    }}
                                >dislike:{item.reaction?.dislike}</i>
                            </div>
                        </>
                    )
                })
            }

        </>
    )
}


export default Post;