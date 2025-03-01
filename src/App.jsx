import React from "react";
import { Routes, Route } from "react-router-dom";
import MainRoutes from "./app/routes/mainRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<MainRoutes />} />
    </Routes>
  );
}
