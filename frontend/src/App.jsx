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
      <div>
        <button
          onClick={() => {
            adminState ? setAdminState(false) : setAdminState(true);
          }}
        >
          Admin
        </button>
      </div>
      <GlobalContext.Provider value={admin}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <a href={"/test"}>
                  <button>To the test</button>
                </a>
              }
            />
            <Route path="/test" element={<PrepTest />} />
            <Route path="/test/begin" element={<WriteTest />} />
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
