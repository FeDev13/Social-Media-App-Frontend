import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/MainHome";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Search } from "./components/Navbar/Search";
import { ThemeProvider } from "./components/Navbar/ThemeContext";
import ProfileUsers from "./components/Profile/UsersProfile";
import Profile from "./components/Profile/MyProfile";
export default function App() {
  return (
    <>
      <div>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={[
                  <div>
                    {" "}
                    <Navbar />,<Home />
                  </div>,
                ]}
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/setAvatar" element={<SetAvatar />} />
              <Route path="/Search/:buscar" element={<Search />} />
              <Route path="/chat" element={[<Navbar />, <Chat />]} />
              <Route path="/Profile/:id" element={[<ProfileUsers />]} />
              <Route path="/Profile" element={[<Profile/>]} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </>
  );
}
