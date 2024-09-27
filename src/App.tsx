import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from 'routes/HomePage';
import NewPostPage from 'routes/NewPostPage';
import SavedPage from 'routes/SavedPage';
import MyPostsPage from 'routes/MyPostsPage';
import SettingsPage from 'routes/SettingsPage';
import PostPage from 'routes/PostPage';
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-post" element={<NewPostPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/myposts/*" element={<MyPostsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/post/*" element={<PostPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
