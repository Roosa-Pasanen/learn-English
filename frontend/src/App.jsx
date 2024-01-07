import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrepTest from "./PrepTest";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={"wip"} />
          <Route path="/test" element={<PrepTest />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
