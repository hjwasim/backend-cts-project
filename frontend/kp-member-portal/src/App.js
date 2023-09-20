import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Registration />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
