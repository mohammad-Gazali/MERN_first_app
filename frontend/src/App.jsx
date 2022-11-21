import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Dashboard, Login, Register } from "./pages";

function App() {
  return (
    <>
      <Router>
        <div className="w-full max-w-[960px] my-0 mx-auto py-0 px-[20px] text-center">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
