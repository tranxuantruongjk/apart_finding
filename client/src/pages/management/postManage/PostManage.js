import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../../../contexts/PostContext";
import { AuthContext } from "../../../contexts/AuthContext";

import { getDetailDateTime } from "../../../utils/post";

import Table from "react-bootstrap/Table";
import { MdDelete } from "react-icons/md";

import "./postManage.scss";

const PostManage = () => {
  const [posts, setPosts] = useState([]);

  const { getUserIdPosts } = useContext(PostContext);
  const {
    authState: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    const getPosts = async () => {
      const res = await getUserIdPosts(user._id);

      if (res.posts.length !== 0) {
        setPosts(res.posts);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="post-manage">
      <div className="post-manage__header">
        <h2>Danh sách tin đăng</h2>
      </div>
      <div className="post-manage__table">
        <Table striped bordered>
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th className="text-center">Ngày đăng</th>
              <th className="text-center">Trạng thái</th>
              <th className="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {posts.length !== 0 ? (
              posts.map((post) => (
                <tr key={post._id}>
                  <td>
                    <Link
                      to={`/${post.rentType}/${post._id}`}
                      className="text-decoration-none"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="text-center">
                    {getDetailDateTime(post.createdAt)}
                  </td>
                  <td className="text-center"></td>
                  <td className="text-center">
                    <MdDelete className="delete-icon" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>
                  Bạn chưa có tin đăng nào. Bấm{" "}
                  <Link to="/me/create" className="text-decoration-none">
                    vào đây
                  </Link>{" "}
                  để đăng tin.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PostManage;
