/* eslint-disable no-unused-vars */
import { Route , Routes } from "react-router-dom"

import GoogleTranslate from "./GoogleTranslate"

import LoginPage from "./pages/CommonPages/LoginPage"
import RegisterPage from "./pages/CommonPages/RegisterPage"
import LandingPage from "./pages/UserPages/LandingPage"

const App = () => {
  return (
    <div>
      {/* <GoogleTranslate /> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<LandingPage />} />
      </Routes>
    </div>
  )
}

export default App