import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="AppContent">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
