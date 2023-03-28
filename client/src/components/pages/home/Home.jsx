import { useEffect } from "react"
import { useState } from "react"
import Header from "../../header/Header"
import Posts from "../../posts/Posts"
import Sidebar from "../../sidebar/Sidebar"
import "./home.css"
import axios from "axios"
import { useLocation } from "react-router-dom"

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await axios.get("/posts"+search)
      setPosts(res.data)
      // console.log(res);
    }
    fetchPosts()
  },[search])

  return (
    <>
        <Header/>
    <div className="home">
        <Posts posts={posts} />
        <Sidebar/>
    </div>
    </>
  )
}
