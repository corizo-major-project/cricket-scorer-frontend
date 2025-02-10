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
import { CurrentPageProvider } from "./token/CurrentPageContext";
import TwoFA from "./components/SigninSignup/TwoFA";
import Home from "./components/UserPages/components/Pages/Home";
import Player from "./components/players/Player";
import PlayerDetails from "./components/players/PlayerDetails";
import CreatePlayer from "./components/players/CreatePlayer";
import { jwtDecode } from "jwt-decode";
import CreateTeam from "./components/team/CreateTeam";
import Team from "./components/team/Team";
import TeamDetails from "./components/team/TeamDetails";
import UpdateTeam from "./components/team/UpdateTeam";
import MatchSetup from "./components/hostMatch/MatchSetup";
import MyMatches from "./components/hostMatch/MyMatches";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

function isTokenExpired(token) {
  if (!token) return true; // No token means expired

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
    return decodedToken.exp < currentTime; // Check if token is expired
  } catch (error) {
    return true; // If token can't be decoded, assume it's expired
  }
}

function ProtectedRoute({ children }) {
  const { accessToken } = useAuth();

  if (!accessToken || isTokenExpired(accessToken)) {
    return <PageLoader childComponent={Signin} />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CurrentPageProvider>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/signin" element={<PageLoader childComponent={Signin} />} />
            <Route path="/signup" element={<PageLoader childComponent={SignUp} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<TwoFA />} />
            <Route path="/user/*" element={<ProtectedRoute><UserWelcome /></ProtectedRoute>}>
              <Route path="" element={<Home />} />
              <Route path="view-players" element={<ProtectedRoute><Player /></ProtectedRoute>} />
              <Route path="view-player/:userName/:id/:name/:roleAsBatsman/:roleAsBowler/:location" element={<ProtectedRoute><PlayerDetails /></ProtectedRoute>} />
              <Route path="create-player" element={<ProtectedRoute><CreatePlayer /></ProtectedRoute>} />
              <Route path="create-team" element={<ProtectedRoute><CreateTeam /></ProtectedRoute>} />
              <Route path="view-teams" element={<ProtectedRoute><Team /></ProtectedRoute>} />
              <Route path="view-team/:teamName" element={<ProtectedRoute><TeamDetails /></ProtectedRoute>}/>
              <Route path="update-team" element={<ProtectedRoute><UpdateTeam /></ProtectedRoute>}/>
              <Route path="host-match" element={<ProtectedRoute><MatchSetup /></ProtectedRoute>}/>
              <Route path="my-matches" element={<ProtectedRoute><MyMatches /></ProtectedRoute>}/>
              <Route path="live-scores" element={<>Home</>} />
              <Route path="host-match" element={<>Home</>} />
              <Route path="contact-us" element={<>Home</>} />
              <Route path="view-profile" element={<ProtectedRoute><PlayerDetails /></ProtectedRoute>} />
            </Route>
          </Routes>
        </CurrentPageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
