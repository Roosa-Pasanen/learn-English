import { BrowserRouter, Route, Routes } from "react-router-dom";
import WordTest from "./WordTest";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WordTest />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
