import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import PostManage from "./postManage/PostManage";
import NewPost from "./newPost/NewPost";
import Profile from "./profile/Profile";
import SavedPost from "./savedPost/SavedPost";

const Management = ({ manageRoute }) => {
  const { pathname } = useLocation();
  let body;

  body = (
    <>
      {manageRoute === "posts" && <PostManage />}
      {manageRoute === "profile" && <Profile />}
      {manageRoute === "create" && <NewPost />}
      {manageRoute === "savedPosts" && <SavedPost />}
    </>
  );

  useEffect(() => {
    const linksList = document.getElementsByClassName("manage-link");
    const linkFind = Object.values(linksList).find(
      (link) => link.attributes.href.value === pathname
    );
    linkFind.classList.add("active");
    const linksFilter = Object.values(linksList).filter(
      (link) => link !== linkFind
    );
    for (let link of linksFilter) {
      link.classList.remove("active");
    }
  }, [pathname]);

  return (
    <div className="container mt-3">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link manage-link" to="/me/posts">
            Quản lý tin đăng
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link manage-link" to="/me/profile">
            Thông tin tài khoản
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link manage-link" to="/me/create">
            Đăng tin mới
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link manage-link" to="/me/savedPosts">
            Tin đã lưu
          </Link>
        </li>
      </ul>
      {body}
    </div>
  );
};

export default Management;
