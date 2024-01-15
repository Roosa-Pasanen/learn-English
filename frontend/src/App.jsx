import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrepTest from "./PrepTest";
import WriteTest from "./WriteTest";
import GlobalContext from "./GlobalContext.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={"wip"} />
          <Route path="/test" element={<PrepTest />} />
          <Route path="/test/begin" element={<WriteTest />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
