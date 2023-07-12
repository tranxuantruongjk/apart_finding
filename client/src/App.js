import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Auth from "./pages/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import DetailPost from "./pages/detail/DetailPost";
import Management from "./pages/management/Management";
import EditPost from "./pages/management/editPost/EditPost";

import PostContextProvider from "./contexts/PostContext";
import SearchProvider from "./contexts/SearchContext";
import UserContextProvider from "./contexts/admin/UserContext";
import AdminPostContextProvider from "./contexts/admin/PostContext";

import Dashboard from "./pages/admin/Dashboard";
import UsersList from "./components/admin/userList/UsersList";
import Starter from "./components/admin/starter/Starter";
import PostsList from "./components/admin/postList/PostsList";
import Post from "./components/admin/post/Post";
import RentTypesList from "./components/admin/rentTypeList/RentTypesList";

function App() {
  useEffect(() => {
    const activeScrollTop = () => {
      const scrollTop = document.getElementById("scroll-top");
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        scrollTop.classList.add("scroll-top-active");
      } else {
        scrollTop.classList.remove("scroll-top-active");
      }
    };
    window.addEventListener("scroll", activeScrollTop);
    return () => {
      window.removeEventListener("scroll", activeScrollTop);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <AuthContextProvider>
      <PostContextProvider>
        <SearchProvider>
          <UserContextProvider>
            <AdminPostContextProvider>
              <Router>
                <Header />
                <Routes>
                  <Route
                    path="/posts/type/:type/:id"
                    element={<DetailPost />}
                  />
                  <Route path="/posts/type/:type" element={<Home />} />
                  <Route path="/posts/search" element={<Home />} />
                  <Route path="/login" element={<Auth authRoute="login" />} />
                  <Route
                    path="/register"
                    element={<Auth authRoute="register" />}
                  />
                  <Route path="/" element={<Home />} />
                  <Route path="/me" element={<ProtectedRoute />}>
                    <Route
                      path="/me/posts"
                      element={<Management manageRoute="posts" />}
                    />
                    <Route path="/me/posts/:id/edit" element={<EditPost />} />
                    <Route
                      path="/me/create"
                      element={<Management manageRoute="create" />}
                    />
                    <Route
                      path="/me/profile"
                      element={<Management manageRoute="profile" />}
                    />
                    <Route
                      path="/me/savedPosts"
                      element={<Management manageRoute="savedPosts" />}
                    />
                  </Route>
                  <Route path="/admin" element={<Dashboard />}>
                    <Route
                      path="/admin"
                      element={<Navigate to="/admin/starter" />}
                    />
                    <Route path="/admin/starter" element={<Starter />} />
                    <Route path="/admin/usersList" element={<UsersList />} />
                    <Route path="/admin/postsList/:id" element={<Post />} />
                    <Route path="/admin/postsList" element={<PostsList />} />
                    <Route
                      path="/admin/rentTypesList"
                      element={<RentTypesList />}
                    />
                  </Route>
                </Routes>
                <Footer />
                <div id="scroll-top" onClick={handleScrollTop}></div>
              </Router>
            </AdminPostContextProvider>
          </UserContextProvider>
        </SearchProvider>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
