import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
