import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import RootPage from "./components/RootPage.jsx";
import MainChat from "./components/MainChat.jsx";


function App() {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<RootPage><MainChat /></RootPage>}/>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
