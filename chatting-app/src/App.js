// components
import LeftSide from "./components/Leftside";
import RightSide from "./components/RightSide";
import ChatAppPage from "./components/ChatAppPage";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import PrivateRoute from "./PrivateRoute.js"

import { useQuery, useSubscription } from "@apollo/client";
import { GET_MESSAGES } from "./libs/client/gql";
import { useEffect, useState } from "react";

import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="home:userName" element={<ChatAppPage />} />
      </Route>
    </Routes>
  );
}

export default App;
