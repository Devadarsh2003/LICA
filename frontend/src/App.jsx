import "./css/App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import LandingPage from "./pages/LandingPage";
import Login from "./components/AuthPage/Login";
import Signup from "./components/AuthPage/Signup"

function App() {
  return (
    <div>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;

