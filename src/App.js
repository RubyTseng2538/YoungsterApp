import React, { useEffect } from 'react';
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
import { HashRouter, Routes, Route } from "react-router-dom";
import {onAuthStateChanged,getAuth} from 'firebase/auth';
import { UserContext, UserProvider } from './userContext';
import { useNavigate } from "react-router-dom";

const FycdRoutes = () => {
  const {dispatch} = React.useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const loginUser = {
          id: user.uid,
          name: user.displayName,
          email: user.email
      }
      dispatch({type:'SET_USER',payload:loginUser})
      navigate('/');
      } else {
        dispatch({type:'SET_USER',payload:{}})
      }
    });
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

