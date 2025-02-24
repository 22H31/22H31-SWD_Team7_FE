import { Route, Routes } from "react-router";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import HeaderDefault from "./layouts/Header/HeaderDefault";
import Footer from "./layouts/Footer/Footer";

function App() {
  return (
    <>
      {<HeaderDefault />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {<Footer/>}
    </>
  );
}

export default App;
