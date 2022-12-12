import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";
import NavbarMenu from "./components/navbarMenu/NavbarMenu";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AuthContextProvider from "./contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <NavbarMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth authRoute="login" />} />
          <Route path="/register" element={<Auth authRoute="register" />} />
          <Route path="/logout" element={<Home />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
