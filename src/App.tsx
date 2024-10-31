import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MarketPage from 'routes/MarketPage';
import NewPostPage from 'routes/NewPostPage';
import SavedPage from 'routes/SavedPage';
import MyPostsPage from 'routes/MyPostsPage';
import SettingsPage from 'routes/SettingsPage';
import PostPage from 'routes/PostPage';
import Header from 'components/header/Header';
import HomePage from 'routes/HomePage';
import Footer from 'components/footer/Footer';
import MobileNavBar from 'components/MobileNavBar';
import LoginPage from 'routes/LoginPage';
import SignupPage from 'routes/SignupPage';
import EmailVerificationPage from 'routes/EmailVerificationPage';
function App() {
  return (
    <BrowserRouter>
        <Header></Header>
        <main className='min-h-screen'>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path="/market" element={<MarketPage />} />
          <Route path="/new-post" element={<NewPostPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/myposts/*" element={<MyPostsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/post/*" element={<PostPage />} />
          
          {/*Routes for login and signup */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/email-verification" element={<EmailVerificationPage/>}/>
        </Routes>
        </main>
        <Footer></Footer>
        <MobileNavBar></MobileNavBar>
    </BrowserRouter>
  );
}

export default App;
