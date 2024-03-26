import React, { useEffect, useState } from 'react';
import './App.css';
import Navigation from './Navigation.js';
import Documents from './pages/Document.js';
import Audio from './pages/Audio.js';
import Video from './pages/Video.js';
import Footer from './Footer.js';
import Login from './pages/Login.js';
import Admin from './pages/Admin.js';
import AddPage from './pages/Add.js';
import EditPage from './pages/Edit.js';
import DocumentDisplay from './pages/DocumentDisplay.js'
import VideoDisplay from './pages/VideoDisplay.js';
import AudioDisplay from './pages/audioDisplay.js';
import LoginVerify from './pages/LoginVerify.js';
import { HashRouter, Routes, Route } from "react-router-dom";
import {onAuthStateChanged,getAuth} from 'firebase/auth';
import { UserContext, UserProvider } from './userContext';
import { useNavigate } from "react-router-dom";

const FycdRoutes = () => {
  const {state, dispatch} = React.useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async(user) => {
      setLoading(true);
      let admin;
      if (user) {
        const loginUser = {
          id: user.uid,
          name: user.displayName,
          email: user.email
        }
        admin = await LoginVerify(loginUser);
        if(admin === true){
          dispatch({type:'SET_USER', payload:loginUser});  
        }else{
          dispatch({type:'SET_USER',payload:{}});
        }
      } else {
        dispatch({type:'SET_USER',payload:{}});
      }
      setLoading(false);
    });
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if(loading === true){
    return(
      <div>Loading</div>
    )
  }else{
    if(state.user.id){
      navigate("/admin");
    }else{
      navigate("/");
    }
  }
  
  return (
    <Routes>
          <Route path="/" element={<Navigation />}></Route>
          <Route path="/documents" element={<Documents />}></Route>
          <Route path="/audio" element={<Audio />}></Route>
          <Route path="/video" element={<Video />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/addpage' element={<AddPage/>}></Route>
          <Route path='/editpage' element={<EditPage/>}></Route>
          <Route path='/DocumentDisplay' element={<DocumentDisplay/>}></Route>
          <Route path='/VideoDisplay' element={<VideoDisplay/>}></Route>
          <Route path='/AudioDisplay' element={<AudioDisplay/>}></Route>
          <Route path='/LoginVerify' element={<LoginVerify/>}></Route>
        </Routes>
  )
}

function App() {
  
  return (
    <UserProvider>
      <div className="App">
        <HashRouter>
          <Footer />
        <FycdRoutes />
        </HashRouter>
        
      </div>
    </UserProvider>
  );
}

export default App;

