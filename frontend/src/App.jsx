import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConfigPage from "./pages/ConfigPage";
import RemarkPage from "./pages/RemarkPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ConfigPage />} />
          <Route path="/remark" element={<RemarkPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
