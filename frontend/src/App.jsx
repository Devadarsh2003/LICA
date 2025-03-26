import "./css/App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
// import Signup from './components/AuthPage/Signup';
// import Login from "./components/AuthPage/Login";
import LandingPage from "./pages/LandingPage";
import NavBar from  "./components/NavBar";

function App() {
  return (
    <div>
      <main className="main-content">
      <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/chat" element={<Chat />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

