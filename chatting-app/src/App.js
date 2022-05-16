// components
import ChatAppPage from "./components/ChatAppPage";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import PrivateRoute from "./PrivateRoute.js";

import { Routes, Route } from "react-router-dom";

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
