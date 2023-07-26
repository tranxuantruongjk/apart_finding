import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import PostItem from "../postItem/PostItem";

import "./postsList.scss";

const PostsList = ({ posts }) => {
  const navigate = useNavigate();
  const [showLoginRequestModal, setShowLoginRequestModal] = useState(false);

  const handleClose = () => setShowLoginRequestModal(false);
  const handleShow = () => setShowLoginRequestModal(true);

  return (
    <div className="posts-list">
      <Card>
        <Card.Body>
          <Card.Title>Danh sách tin đăng</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item className="border-danger" />
            {posts &&
              posts.map((post) => (
                <ListGroup.Item key={post._id} className="border-danger">
                  <PostItem post={post} handleShow={handleShow}/>
                </ListGroup.Item>
              ))}
            <ListGroup.Item></ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
      <Modal
        show={showLoginRequestModal}
        onHide={handleClose}
        className="login-request-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Vui lòng đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>Vui lòng đăng nhập hoặc đăng ký để lưu tin</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => navigate("/login")}>Đăng nhập</Button>
          <Button onClick={() => navigate("/register")}>Đăng ký</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostsList;
