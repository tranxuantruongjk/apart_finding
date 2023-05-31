import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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
import SearchProvider from "./contexts/SearchContext";
import UserContextProvider from "./contexts/admin/UserContext";
import AdminPostContextProvider from "./contexts/admin/PostContext";

import Dashboard from "./pages/admin/Dashboard";
import UsersList from "./components/admin/userList/UsersList";
import Starter from "./components/admin/starter/Starter";
import PostsList from "./components/admin/postList/PostsList";
import Post from "./components/admin/post/Post";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <SearchProvider>
          <UserContextProvider>
            <AdminPostContextProvider>
              <Router>
                <Header />
                {/* <NavbarMenu /> */}
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
                    <Route path="/me/savedPosts" element={<Management manageRoute="savedPosts"/>} />
                  </Route>
                  <Route path="/admin" element={<Dashboard />}>
                    <Route path="/admin" element={<Navigate to="/admin/starter" />} />
                    <Route path="/admin/starter" element={<Starter />} />
                    <Route path="/admin/usersList" element={<UsersList />}/>
                    <Route path="/admin/postsList/:id" element={<Post />} />
                    <Route path="/admin/postsList" element={<PostsList />}/>
                  </Route>
                </Routes>
              </Router>
            </AdminPostContextProvider>
          </UserContextProvider>
        </SearchProvider>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
