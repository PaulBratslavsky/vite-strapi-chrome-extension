import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";


export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(
    () =>
      chrome.storage.sync.get(
        ["user"],
        (result) => result.user && setUser(result.user)
      ),
    []
  );

  useEffect(() => {
    if (user) {
      chrome.storage.sync.set({
        user: {
          token: user.token,
          user: {
            id: user.user.id,
            username: user.user.username,
            email: user.user.email,
          },
        },
      });
    }
  }, [user]);

  useEffect(() => {
    user ? navigate("/dashboard") : navigate("/");
  }, [user, navigate]);

  const handleLogout = () => chrome.storage.sync.set({ user: null });

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={!user && <LoginForm setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={user && <Logout onClick={handleLogout} />}
        />
      </Routes>
    </div>
  );
}
