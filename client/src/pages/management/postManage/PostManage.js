import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../../../contexts/PostContext";
import { AuthContext } from "../../../contexts/AuthContext";

import { getDetailDateTime } from "../../../utils/post";

import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { MdDelete } from "react-icons/md";

import "./postManage.scss";

const PostManage = () => {
  const [posts, setPosts] = useState([]);

  const { getUserIdPosts } = useContext(PostContext);
  const {
    authState: { user },
    notifications,
  } = useContext(AuthContext);

  const [showReasonModal, setShowReasonModal] = useState(false);
  const [rejectedReason, setRejectedReason] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      const res = await getUserIdPosts(user._id);

      if (res.posts.length !== 0) {
        setPosts(res.posts);
      }
    };

    getPosts();
  }, [notifications]);

  const handleShowRejectedReason = (reason) => {
    setShowReasonModal(true);
    setRejectedReason(reason);
  };

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
                  <td className="text-center">
                    {post.state === "pending" ? (
                      <span className="stt-pending">Đang chờ duyệt</span>
                    ) : post.state === "active" ? (
                      <span className="stt-active">Đã đăng</span>
                    ) : (
                      <>
                        <span className="stt-rejected">Bị từ chối</span>
                        <div
                          className="rejected-reason"
                          onClick={() => handleShowRejectedReason(post.reason)}
                        >
                          Xem lý do bị từ chối và sửa tin
                        </div>
                      </>
                    )}
                  </td>
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
      <Modal
        show={showReasonModal}
        onHide={() => setShowReasonModal(false)}
        className="reason-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Lý do bị từ chối</Modal.Title>
        </Modal.Header>
        <Modal.Body className="detailed-reason">{rejectedReason}</Modal.Body>
        <Modal.Footer>
          <Button className="edit-button">Sửa tin</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostManage;
