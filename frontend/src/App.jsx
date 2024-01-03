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
