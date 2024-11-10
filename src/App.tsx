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
import NotFoundPage from 'routes/NotFoundPage';
import AuthenticatedRoutes from 'routes/AuthenticatedRoutes';
import AuthRelatedRoutes from 'routes/AuthRelatedRoutes';
import EditPostPage from 'routes/EditPostPage';
import PendingUserUpdatesPage from 'routes/PendingUserUpdatesPage';
import PendingPostPage from 'routes/PendingPostPage';
import AdminRoutes from 'routes/AdminRoutes';
function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <main className='min-h-screen'>
        <Routes>
          {/*Home route */}
          <Route path='/' element={<HomePage />}></Route>
          {/*Routes for that require login */}
          <Route element={<AuthenticatedRoutes />}>
            <Route path="/market" element={<MarketPage />} />
            <Route path="/new-post" element={<NewPostPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/myposts/*" element={<MyPostsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/post/*" element={<PostPage />} />
            <Route path="edit-post/:postId" element={<EditPostPage />} />
            <Route element={<AdminRoutes />} >
              <Route path='/pending-post' element={<PendingPostPage />} />
              <Route path='/pending-user-updates' element={<PendingUserUpdatesPage />} />
            </Route>
          </Route>

          {/*Routes for login and signup */}
          <Route element={<AuthRelatedRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/email-verification" element={<EmailVerificationPage />} />
          </Route>
          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer></Footer>
      <MobileNavBar></MobileNavBar>
    </BrowserRouter>
  );
}

export default App;
