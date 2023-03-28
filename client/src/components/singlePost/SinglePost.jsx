import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css"

export default function SinglePost() {
    const{user} = useContext(Context);
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({})
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [updateMode, setUpdateMode] = useState(false)

    useEffect(() =>{
        const getPost = async ()=>{
            const res = await axios.get("/posts/"+path);
            console.log(res);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost()
     },[path]);

     const handleDelete = async() =>{
        try{
            await axios.delete("/posts/"+path,{data:{username:user.username}});
            window.location.replace("/");
        }
        catch(err){
        }
    }
    
    const handleUpdate = async() =>{
         try{
             await axios.put("/posts/"+path,{username:user.username,title,desc});
            //  window.location.replace();
            setUpdateMode(false);
         }
         catch(err){
         }

     }
     const PF = "http://localhost:5000/images/"
  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
            {post.photo && 
                <img src= {PF + post.photo}
                alt="" 
                className="singlePostImg" />            
            } 
            {
                updateMode ? <input type="text" value={title} className="singlePostTitleInput" onChange={(e)=>setTitle(e.target.value)}/> :(
                    <h1 className="singlePostTitle">
                        {title}
                        {post.username === user?.username &&
                            <div className="singlePostEdit">
                            <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
                            <i className="singlePostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
                            </div>          
                        }
                    </h1>
                 ) 
             } 
            <div className="singlePostInfo">
                <span className="singlePostAuthor">
                    Author : 
                    <Link to={`/?user=${post.username}`} className="link">
                        <b>{post.username}</b>
                    </Link>
                    </span>
                <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            {
                updateMode ? (
                <textarea 
                className="singlePostDescInput" value={desc} onChange={(e)=>setDesc(e.target.value)} autoFocus
                />
                ) :(
                    <p className="singlePostDesc">
                        {desc}
                    </p>
                )
            }
            {updateMode &&
            <button className="singlePostButton" onClick={handleUpdate}>Update</button>
            }
        </div>
        </div>
  )
}
