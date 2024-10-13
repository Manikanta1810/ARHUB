/* eslint-disable no-unused-vars */
import { Route , Routes } from "react-router-dom"

import GoogleTranslate from "./GoogleTranslate"

import LoginPage from "./pages/CommonPages/LoginPage"
import RegisterPage from "./pages/CommonPages/RegisterPage"
import LandingPage from "./pages/UserPages/LandingPage"
import FeedbackPage from "./pages/UserPages/FeedbackPage"
import UserProfilePage from "./pages/UserPages/UserProfilePage"
import AdminLandingPage from "./pages/AdminPages/AdminLandingPage"
import AdminUserManagement from "./pages/AdminPages/AdminUserManagement"
import AdminFeedbackSystem from "./pages/AdminPages/AdminFeedbackSystem"
import UserList from "./pages/UserPages/UserList"

const App = () => {
  return (
    <div>
      {/* <GoogleTranslate /> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/mylist" element={<UserList />} />

        <Route path="/admin-dashboard" element={<AdminLandingPage />} />

      </Routes>
    </div>
  )
}

export default App