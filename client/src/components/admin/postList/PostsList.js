import React, { useContext, useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import {
  MdOutlineDelete,
  MdOutlineRemoveRedEye,
} from "react-icons/md";

import { AdminPostContext } from "../../../contexts/admin/PostContext";
import ActionModal from "../actionModal/ActionModal";
import Paging from "../paging/Paging";

import "./postsList.scss";
import { Link } from "react-router-dom";

const PostsList = () => {
  const {
    adminPostState: { posts, page, limit, total, filter },
    getAllPosts,
    deletePost,
    changePage,
    changeLimit,
    changeFilter,
  } = useContext(AdminPostContext);

  const [showActionModal, setShowActionModal] = useState(false);
  const [action, setAction] = useState(null);

  const handleClickList = (e) => {
    const btnsList = Object.values(
      document.getElementById("post-selector").childNodes
    );
    changePage(1);
    changeFilter(e.target.id);
    const remainList = btnsList.filter((btn) => btn !== e.target);
    e.target.classList.add("active");
    for (let btn of remainList) {
      btn.classList.remove("active");
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      await getAllPosts();
    };

    getPosts();
  }, [page, limit, filter]);

  const handleActionDelete = (postId) => {
    setShowActionModal(true);
    setAction({
      object: postId,
      action: deletePost,
      message: "Bạn chắc chắn muốn xóa bài đăng này?",
      button: "Xác nhận",
    });
  };

  return (
    <div className="admin-posts-list">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Danh sách bài đăng</h5>
        {/* <Button
          className="d-flex justify-content-between align-items-center fw-bold"
          // onClick={() => setShowNewUserModal(true)}
        >
          <MdOutlinePostAdd width="20" height="20" className="me-2" />
          <span>Thêm</span>
        </Button> */}
      </div>
      <Card>
        <Card.Header id="post-selector">
          <Button
            id="all"
            variant="link"
            className={
              filter === "all"
                ? "text-decoration-none text-dark fw-bold active"
                : "text-decoration-none text-dark fw-bold"
            }
            onClick={handleClickList}
          >
            Tất cả
          </Button>
          <Button
            id="active"
            variant="link"
            className={
              filter === "active"
                ? "text-decoration-none text-dark fw-bold active"
                : "text-decoration-none text-dark fw-bold"
            }
            onClick={handleClickList}
          >
            Đang hiển thị
          </Button>
          <Button
            id="pending"
            variant="link"
            className={
              filter === "pending"
                ? "text-decoration-none text-dark fw-bold active"
                : "text-decoration-none text-dark fw-bold"
            }
            onClick={handleClickList}
          >
            Đang chờ duyệt
          </Button>
          <Button
            id="rejected"
            variant="link"
            className={
              filter === "rejected"
                ? "text-decoration-none text-dark fw-bold active"
                : "text-decoration-none text-dark fw-bold"
            }
            onClick={handleClickList}
          >
            Bị từ chối
          </Button>
        </Card.Header>
        <Card.Body>
          <Table
            className="no-wrap align-middle"
            responsive
            borderless
            hover
          >
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Loại phòng</th>
                <th>Giá (&#8363;/tháng)</th>
                <th>Diện tích (m&sup2;)</th>
                <th>Trạng thái</th>
                <th className="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((tdata, index) => (
                <tr key={index} className="border-top font-size-sm">
                  <td>
                    <Link
                      to={`/admin/postsList/${tdata._id}`}
                      className="text-decoration-none"
                    >
                      <span className="fw-semibold">{tdata.title}</span>
                    </Link>
                  </td>
                  <td>{tdata.rentType.name}</td>
                  <td>{tdata.price.toLocaleString('de-DE')}</td>
                  <td>{tdata.area}</td>
                  <td>
                    <span
                      className={
                        tdata.state === "pending"
                          ? "pending"
                          : tdata.state === "active"
                          ? "active"
                          : "rejected"
                      }
                    >
                      {tdata.state}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-around fs-5">
                      <Link to={`/admin/postsList/${tdata._id}`}>
                        <MdOutlineRemoveRedEye className="btn-action" />
                      </Link>
                      <MdOutlineDelete
                        className="btn-action"
                        onClick={() => handleActionDelete(tdata._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Paging
        page={page}
        limit={limit}
        totalPosts={total}
        changePage={changePage}
        changeLimit={changeLimit}
      />
      <ActionModal
        showActionModal={showActionModal}
        setShowActionModal={setShowActionModal}
        action={action}
      />
    </div>
  );
};

export default PostsList;
