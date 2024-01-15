import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import PrepTest from "./PrepTest";
import WriteTest from "./WriteTest";
import GlobalContext from "./GlobalContext.jsx";

function App() {
  const [adminState, setAdminState] = useState(false);
  const admin = { adminState };

  return (
    <>
      <button onClick={() => setAdminState(true)}> Admin </button>
      <GlobalContext.Provider value={admin}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={"wip"} />
            <Route path="/test" element={<PrepTest />} />
            <Route path="/test/begin" element={<WriteTest />} />
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
