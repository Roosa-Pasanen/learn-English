import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import PrepTest from "./PrepTest";
import WriteTest from "./WriteTest";
import GlobalContext from "./GlobalContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

function App() {
  const [adminState, setAdminState] = useState(false);
  const admin = { adminState };

  return (
    <>
      <header
        className="d-flex justify-content-end"
        style={{ backgroundColor: "aliceblue", width: "100%", height: "10vh" }}
      >
        <Button
          variant="light"
          onClick={() => {
            adminState ? setAdminState(false) : setAdminState(true);
          }}
        >
          Admin
        </Button>
      </header>
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
