import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";
import NavbarMenu from "./components/navbarMenu/NavbarMenu";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import DetailPost from "./pages/detail/DetailPost";
import Management from "./pages/management/Management";

import PostContextProvider from "./contexts/PostContext";
import AddressProvider from "./contexts/AddressContext";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <AddressProvider>
          <Router>
            <Header />
            <NavbarMenu />
            <Routes>
              <Route path="/:type/:id" element={<DetailPost />} />
              <Route path="/:type" element={<Home />} />
              <Route path="/search" element={<Home />} />
              <Route path="/login" element={<Auth authRoute="login" />} />
              <Route path="/register" element={<Auth authRoute="register" />} />
              <Route path="/" element={<Home />} />
              <Route path="/me" element={<ProtectedRoute />}>
                <Route path="/me/posts" element={<Management manageRoute="posts"/>} />
                <Route path="/me/create" element={<Management manageRoute="create"/>} />
                <Route path="/me/profile" element={<Management manageRoute="profile"/>} />
              </Route>
            </Routes>
          </Router>
        </AddressProvider>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
