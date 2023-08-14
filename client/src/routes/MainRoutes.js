import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../pages/home/Home";
import Search from "../pages/search/Search";
import Auth from "../pages/Auth";
import ProtectedRoute from "./ProtectedRoute";
import DetailPost from "../pages/detail/DetailPost";
import Management from "../pages/management/Management";
import EditPost from "../pages/management/editPost/EditPost";

import Dashboard from "../pages/admin/Dashboard";
import UsersList from "../components/admin/userList/UsersList";
import Starter from "../components/admin/starter/Starter";
import PostsList from "../components/admin/postList/PostsList";
import Post from "../components/admin/post/Post";
import RentTypesList from "../components/admin/rentTypeList/RentTypesList";
import UtilitiesList from "../components/admin/utility/UtilitiesList";

import MainPage from "../pages/MainPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<Home />} />
        <Route path="/" element={<Navigate to="/" />} />
        <Route path="/posts/type/:type/:id" element={<DetailPost />} />
        <Route path="/posts/type/:type" element={<Home />} />
        <Route path="/posts/search" element={<Search />} />
        <Route path="/login" element={<Auth authRoute="login" />} />
        <Route path="/register" element={<Auth authRoute="register" />} />

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
          <Route path="/admin" element={<Navigate to="/admin/starter" />} />
          <Route path="/admin/starter" element={<Starter />} />
          <Route path="/admin/usersList" element={<UsersList />} />
          <Route path="/admin/postsList/:id" element={<Post />} />
          <Route path="/admin/postsList" element={<PostsList />} />
          <Route path="/admin/rentTypesList" element={<RentTypesList />} />
          <Route path="/admin/utilitiesList" element={<UtilitiesList />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default MainRoutes;
