import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SmoothScroll from "smooth-scroll";
import Welcome from "./components/WelcomePage/Welcome";
import PageLoader from "./components/SigninSignup/PageLoader";
import Signin from "./components/SigninSignup/Signin";
import SignUp from "./components/SigninSignup/SignUp";
import UserWelcome from "./components/UserPages/UserWelcome";
import ForgotPassword from "./components/SigninSignup/ForgotPassword";
import { AuthProvider, useAuth } from "./token/AuthContext";
import TwoFA from "./components/SigninSignup/TwoFA";
import Home from "./components/UserPages/components/Pages/Home";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

function ProtectedRoute({ children }) {
  const { accessToken } = useAuth();
  if (!accessToken) {
    return <PageLoader childComponent={Signin} />;
  }

  return children;
}

function App() {
  return (
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signin" element={<PageLoader childComponent={Signin} />} />
          <Route path="/signup" element={<PageLoader childComponent={SignUp} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<TwoFA />} />
          <Route path="/user/*" element={<ProtectedRoute><UserWelcome /></ProtectedRoute>}>
            <Route path="" element={<Home />} />
            <Route path="live-scores" element={<>Home</>} />
            <Route path="host-match" element={<>Home</>} />
            <Route path="contact-us" element={<>Home</>} />
            <Route path="view-profile" element={<>Home</>} />
          </Route>
        </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
