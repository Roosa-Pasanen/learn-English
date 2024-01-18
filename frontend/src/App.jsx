import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import PrepTest from "./PrepTest";
import WriteTest from "./WriteTest";
import GlobalContext from "./GlobalContext.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Button } from "../node_modules/react-bootstrap";

function App() {
  const [adminState, setAdminState] = useState(false);
  const admin = { adminState };

  return (
    <>
      <div>
        <Button
          variant="light"
          onClick={() => {
            adminState ? setAdminState(false) : setAdminState(true);
          }}
        >
          Admin
        </Button>
      </div>
      <GlobalContext.Provider value={admin}>
        <Router>
          <Routes>
            <Route path="/" element={<PrepTest />} />
            <Route path="/begin" element={<WriteTest />} />
          </Routes>
        </Router>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
