import { Route, Routes } from "react-router";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import HeaderDefault from "./layouts/Header/HeaderDefault";
import Footer from "./layouts/Footer/Footer";
import ForgotPassword from "./page/ForgotPassword/ForgotPassword";

function App() {
  return (
    <>
      {<HeaderDefault />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
      {<Footer/>}
    </>
  );
}

export default App;
