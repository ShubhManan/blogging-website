import React, { useContext } from "react";
import Home from './components/pages/home/Home';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';
import Settings from './components/pages/settings/Settings';
import Setting from './components/pages/settings/Settings';
import Single from './components/pages/single/Single';
import Write from './components/pages/write/Write';
import TopBar from './components/topbar/TopBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  BrowserRouter
} from "react-router-dom";
import Header from "./components/header/Header";
import Post from "./components/post/Post";
import { Context } from "./context/Context";

function App() {
  const {user}= useContext(Context);

  return (
    <BrowserRouter>
         {/* <Switch> */}
         <TopBar/>
         <Routes>
           <Route exact path ="/" element={<Home/>} />
           <Route exact path ="/register" element={user?<Home/> : <Register/>} />
           <Route exact path ="/login" element={user?<Home/> :<Login/>} />
           <Route exact path ="/settings" element={user?<Settings/>:<Login/>} />
           <Route exact path ="/write" element={ user?<Write/>:<Register/> } />
           <Route exact path ="/post/:postId" element={<Single/>} />
         </Routes>
     </BrowserRouter>
  );
}

export default App;
