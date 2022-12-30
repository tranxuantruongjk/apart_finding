import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";
import NavbarMenu from "./components/navbarMenu/NavbarMenu";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Post from "./components/post/Post";
import PostContextProvider from "./contexts/PostContext";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Header />
          <NavbarMenu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth authRoute="login" />} />
            <Route path="/register" element={<Auth authRoute="register" />} />
            <Route path="/logout" element={<Home />} />
            <Route path="/me" element={<ProtectedRoute />}>
              <Route path="/me/create" element={<Post />} />
            </Route>
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
