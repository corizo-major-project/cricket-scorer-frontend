import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SmoothScroll from "smooth-scroll";
import Welcome from "./components/WelcomePage/Welcome";
import PageLoader from "./components/SigninSignup/PageLoader";
import Signin from "./components/SigninSignup/Signin";
import SignUp from "./components/SigninSignup/SignUp";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />}/>
          <Route path="/signin" element={<PageLoader childComponent={Signin} />} />
          <Route path="/signup" element={<PageLoader childComponent={SignUp} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
