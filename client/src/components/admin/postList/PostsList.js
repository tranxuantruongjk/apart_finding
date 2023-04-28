import React, { useContext, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import {
  MdOutlineDelete,
  MdOutlineRemoveRedEye,
  MdOutlinePostAdd,
} from "react-icons/md";

import { AdminPostContext } from "../../../contexts/admin/PostContext";

import "./postsList.scss";
import { Link } from "react-router-dom";

const PostsList = () => {
  const {
    adminPostState: { posts },
    getAllPosts,
  } = useContext(AdminPostContext);

  const handleClickList = (e) => {
    const btnsList = Object.values(
      document.getElementById("post-selector").childNodes
    );
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
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Danh sách bài đăng</h5>
        <Button
          className="d-flex justify-content-between align-items-center fw-bold"
          // onClick={() => setShowNewUserModal(true)}
        >
          <MdOutlinePostAdd width="20" height="20" className="me-2" />
          <span>Thêm</span>
        </Button>
      </div>
      <Card>
        <Card.Header id="post-selector">
          <Button
            variant="link"
            className="text-decoration-none text-dark fw-bold active"
            onClick={handleClickList}
          >
            Tất cả
          </Button>
          <Button
            variant="link"
            className="text-decoration-none text-dark fw-bold"
            onClick={handleClickList}
          >
            Đang hiển thị
          </Button>
          <Button
            variant="link"
            className="text-decoration-none text-dark fw-bold"
            onClick={handleClickList}
          >
            Chờ duyệt
          </Button>
        </Card.Header>
        <Card.Body>
          <Table
            className="no-wrap mt-3 align-middle"
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
                <th className="text-center">Actions</th>
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
                  <td>{tdata.price}</td>
                  <td>{tdata.area}</td>
                  <td>
                    <span
                      className={
                        tdata.state === "pending"
                          ? "pending"
                          : tdata.state === "accepted"
                          ? "accepted"
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
                      <MdOutlineDelete className="btn-action" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostsList;