import React from 'react';
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




function App() {
  return (
    <div className="App">
      <HashRouter>
        <Footer />
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
      </HashRouter>
      
    </div>
  );
}

export default App;

