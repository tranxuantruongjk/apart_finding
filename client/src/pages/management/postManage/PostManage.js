import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../../../contexts/PostContext";
import { AuthContext } from "../../../contexts/AuthContext";
import AlertMessage from "../../../components/alertMessage/AlertMessage";

import { getDetailDateTime } from "../../../utils/post";

import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { MdDelete } from "react-icons/md";
import { BiEdit, BiHide, BiShow } from "react-icons/bi";

import "./postManage.scss";

const PostManage = () => {
  const [posts, setPosts] = useState([]);

  const { getUserIdPosts, deletePost, hidePost, activatePost } =
    useContext(PostContext);
  const {
    authState: { user },
    notifications,
  } = useContext(AuthContext);

  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showHideModal, setShowHideModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rejectedPost, setRejectedPost] = useState(null);
  const [hidedPost, setHidedPost] = useState(null);
  const [activatedPost, setActivatedPost] = useState(null);
  const [deletedPost, setDeletedPost] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      const res = await getUserIdPosts(user._id);

      if (res.posts.length !== 0) {
        setPosts(res.posts);
      }
    };

    getPosts();
  }, [notifications]);

  const handleShowRejectedReason = (post) => {
    setShowReasonModal(true);
    setRejectedPost(post);
  };

  const handleShowHideModal = (post) => {
    setShowHideModal(true);
    setHidedPost(post);
  };

  const handleShowActivateModal = (post) => {
    setShowActivateModal(true);
    setActivatedPost(post);
  };

  const handleShowDeleteModal = (post) => {
    setShowDeleteModal(true);
    setDeletedPost(post);
  };

  const handleHidePost = async () => {
    const result = await hidePost(hidedPost._id);
    if (result.success) {
      setShowHideModal(false);
      setAlert({ type: "success", message: "Tin đăng đã được ẩn thành công" });
      setTimeout(() => setAlert(null), 5000);
      const res = await getUserIdPosts(user._id);
      if (res.posts.length !== 0) {
        setPosts(res.posts);
      }
    } else {
      setShowHideModal(false);
      setAlert({ type: "danger", message: result.message });
      setTimeout(() => setAlert(null), 5000);
    }
  };

  const handleActivatePost = async () => {
    const result = await activatePost(activatedPost._id);
    if (result.success) {
      setShowActivateModal(false);
      setAlert({ type: "success", message: "Tin đăng đã được hiện thành công" });
      setTimeout(() => setAlert(null), 5000);
      const res = await getUserIdPosts(user._id);
      if (res.posts.length !== 0) {
        setPosts(res.posts);
      }
    } else {
      setShowActivateModal(false);
      setAlert({ type: "danger", message: result.message });
      setTimeout(() => setAlert(null), 5000);
    }
  };

  const handleDeletePost = async () => {
    const result = await deletePost(deletedPost._id);
    if (result.success) {
      setShowDeleteModal(false);
      setAlert({ type: "success", message: "Tin đăng đã được xóa thành công" });
      setTimeout(() => setAlert(null), 5000);
      const res = await getUserIdPosts(user._id);

      if (res.posts.length !== 0) {
        setPosts(res.posts);
      }
    } else {
      setShowDeleteModal(false);
      setAlert({ type: "danger", message: result.message });
      setTimeout(() => setAlert(null), 5000);
    }
  };

  return (
    <div className="post-manage">
      <div className="post-manage__header">
        <h2>Danh sách tin đăng</h2>
      </div>
      <AlertMessage info={alert} />
      <div className="post-manage__table">
        <Table striped bordered>
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th className="text-center">Ngày tạo</th>
              <th className="text-center">Ngày cập nhật mới nhất</th>
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
                      to={`/posts/type/${post.rentType}/${post._id}`}
                      className={
                        post.state !== "active"
                          ? "disabled-link text-decoration-none"
                          : "text-decoration-none"
                      }
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="text-center">
                    {getDetailDateTime(post.createdAt)}
                  </td>
                  <td className="text-center">
                    {getDetailDateTime(post.updatedAt)}
                  </td>
                  <td className="text-center">
                    {post.state === "pending" ? (
                      <span className="stt-pending">Đang chờ duyệt</span>
                    ) : post.state === "active" ? (
                      <span className="stt-active">Đã đăng</span>
                    ) : post.state === "hided" ? (
                      <span className="stt-hided">Đã ẩn</span>
                    ) : (
                      <>
                        <span className="stt-rejected">Bị từ chối</span>
                        <div
                          className="rejected-reason"
                          onClick={() => handleShowRejectedReason(post)}
                        >
                          Xem lý do bị từ chối và sửa tin
                        </div>
                      </>
                    )}
                  </td>
                  <td className="text-center">
                    <Link
                      to={`/me/posts/${post._id}/edit`}
                      state={post}
                      className={
                        post.state === "pending" ? "disabled-link" : ""
                      }
                    >
                      <BiEdit className="edit-icon" title="Sửa tin" />
                    </Link>
                    {post.state !== "hided" ? (
                      <BiHide
                        className={
                          post.state === "pending"
                            ? "hide-icon disabled-link"
                            : "hide-icon"
                        }
                        title="Ẩn tin"
                        onClick={() => handleShowHideModal(post)}
                      />
                    ) : (
                      <BiShow
                        className={
                          post.state === "pending"
                            ? "hide-icon disabled-link"
                            : "hide-icon"
                        }
                        title="Hiện tin"
                        onClick={() => handleShowActivateModal(post)}
                      />
                    )}
                    <MdDelete
                      className={
                        post.state === "pending"
                          ? "delete-icon disabled-link"
                          : "delete-icon"
                      }
                      title="Xóa tin"
                      onClick={() => handleShowDeleteModal(post)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
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
      {rejectedPost && (
        <Modal
          show={showReasonModal}
          onHide={() => setShowReasonModal(false)}
          className="reason-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Lý do bị từ chối</Modal.Title>
          </Modal.Header>
          <Modal.Body className="detailed-reason">
            {rejectedPost.reason}
          </Modal.Body>
          <Modal.Footer>
            <Link
              to={`/me/posts/${rejectedPost._id}/edit`}
              state={rejectedPost}
              style={{ width: "100%" }}
            >
              <Button className="edit-button">Sửa tin</Button>
            </Link>
          </Modal.Footer>
        </Modal>
      )}
      {hidedPost && (
        <Modal
          show={showHideModal}
          onHide={() => setShowHideModal(false)}
          className="hide-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Ẩn tin đăng</Modal.Title>
          </Modal.Header>
          <Modal.Body className="detailed-reason">
            <span>
              Bạn có chắc chắn muốn ẩn tin đăng <b>{hidedPost.title}</b> không?
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowHideModal(false)}>
              Hủy
            </Button>
            <Button className="hide-button" onClick={handleHidePost}>
              Ẩn
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {activatedPost && (
        <Modal
          show={showActivateModal}
          onHide={() => setShowActivateModal(false)}
          className="activate-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Hiện tin đăng</Modal.Title>
          </Modal.Header>
          <Modal.Body className="detailed-reason">
            <span>
              Bạn có chắc chắn muốn hiện tin đăng <b>{activatedPost.title}</b> không?
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowActivateModal(false)}>
              Hủy
            </Button>
            <Button className="hide-button" onClick={handleActivatePost}>
              Hiện
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {deletedPost && (
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          className="delete-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Xóa tin đăng</Modal.Title>
          </Modal.Header>
          <Modal.Body className="detailed-reason">
            <span>
              Bạn có chắc chắn muốn xóa tin đăng <b>{deletedPost.title}</b>{" "}
              không?
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Hủy
            </Button>
            <Button className="delete-button" onClick={handleDeletePost}>
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default PostManage;
