import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './utils/AuthContext';
import { PublicRoute , ProtectedRoute } from './utils/RouteComponent';

import { ThemeProvider } from './contexts/ThemeContext';

import LoginPage from "./pages/CommonPages/LoginPage";
import RegisterPage from "./pages/CommonPages/RegisterPage";
import LandingPage from "./pages/UserPages/LandingPage";
import FeedbackPage from "./pages/UserPages/FeedbackPage";
import UserProfilePage from "./pages/UserPages/UserProfilePage";
import AdminLandingPage from "./pages/AdminPages/AdminLandingPage";
import UserList from "./pages/UserPages/UserList";
import NewsEventPage from './pages/UserPages/NewsEventPage';
import DATPage from './pages/UserPages/DATPage';
import DiscussionForumPage from './pages/UserPages/DsicussionForumPage';
import ARBotPage from './pages/UserPages/ARBotPage';
import TranslateHeader from './Translateheader';
import AboutusPage from './pages/UserPages/AboutusPage';



const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
      <div>
        <TranslateHeader />
        <ARBotPage />
        <Routes>
          <Route path="/" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          
          <Route path="/register" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } />
          
          <Route path="/home" element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          } />
          
          <Route path="/feedback" element={
            <ProtectedRoute>
              <FeedbackPage />
            </ProtectedRoute>
          } />

          <Route path="/news" element={
            <ProtectedRoute>
              <NewsEventPage />
            </ProtectedRoute>
          } />

          <Route path="/dat" element={
            <ProtectedRoute>
              <DATPage />
            </ProtectedRoute>
          } />

          <Route path="/aboutus" element={
            <ProtectedRoute>
              <AboutusPage />
            </ProtectedRoute>
          } />

          <Route path="/discussion" element={
            <ProtectedRoute>
              <DiscussionForumPage />
            </ProtectedRoute>
          } />

          <Route path="/arbot" element={
            <ProtectedRoute>
              <ARBotPage />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          } />
          
          <Route path="/mylist" element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          } />
          
          <Route path="/admin-dashboard" element={
            <ProtectedRoute adminOnly={true}>
              <AdminLandingPage />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      </ThemeProvider>
    </AuthProvider>
  );
};



export default App;