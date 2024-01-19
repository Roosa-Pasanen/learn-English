import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import PrepTest from "./PrepTest";
import WriteTest from "./WriteTest";
import GlobalContext from "./GlobalContext.jsx";
import ScoreContext from "./ScoreContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

/**
 * Contains the application's global elements.
 *
 * @returns The application
 */
function App() {
  //Stores whether or not the user is allowed to edit information
  const [adminState, setAdminState] = useState(false);
  //Stores the state of test scoring
  const [scoreState, setScoreState] = useState(0);
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
        <ScoreContext.Provider value={{ scoreState, setScoreState }}>
          <Router>
            <Routes>
              <Route path="/" element={<PrepTest />} />
              <Route path="/begin" element={<WriteTest />} />
            </Routes>
          </Router>
        </ScoreContext.Provider>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
