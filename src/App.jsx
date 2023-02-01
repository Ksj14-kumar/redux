import './App.css'
import { useDispatch, useSelector } from 'react-redux';

import AddPost from './Components/AddPost';
import Post from "./Components/Post"


function App() {
  const post = useSelector((state) => {
    return state
  })

  return (
    <div className="App">

      <AddPost />
      <Post postlist={post} />
    </div>
  )
}

export default App;
