import { useState } from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProfileScreen from "./screens/ProfileScreen";
import ForgotPassScreen from "./screens/ForgotPassScreen";
import VerifyOTPScreen from "./screens/VerifyOTPScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} exact/>
              <Route path='login/' element={<LoginScreen />} />
              <Route path='register/' element={<RegisterScreen />} />
              <Route path='profile/' element={<ProfileScreen />} />
              <Route path='/auth/reset-password/' element={<ForgotPassScreen />} />
              <Route path='/verify-otp/' element={<VerifyOTPScreen />} />
              <Route path="/reset-password/:uidb64/:token" element={<ChangePasswordScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
