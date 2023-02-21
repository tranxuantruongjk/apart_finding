import React, { useContext, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

import { FaRegClock } from "react-icons/fa";
import { FaChartArea } from "react-icons/fa";
import { FaSearchLocation } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

import { getDate, getDistrictName } from "../../utils/post";

import { PostContext } from "../../contexts/PostContext";

const PostsList = () => {
  const { type } = useParams();
  const { pathname } = useLocation();

  const {
    postState: { posts },
    getPosts,
  } = useContext(PostContext);

  // Start: get all posts
  useEffect(() => {
    if (type) {
      getPosts(type);
    } else if (pathname === "/") {
      getPosts();
    }
  }, [type, pathname]);

  return (
    <div className="posts-list">
      <Card>
        <Card.Body>
          <Card.Title>Danh sách tin đăng</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item className="border-danger" />
            {posts.map((post) => (
              <ListGroup.Item key={post._id} className="border-danger">
                <Row>
                  <Col md={5}>
                    <img src={post.image} alt="anh" className="post__image" />
                  </Col>
                  <Col md={7}>
                    <Link
                      to={`/${post.rentType}/${post._id}`}
                      className="text-decoration-none"
                    >
                      <h5 className="post__title">{post.title}</h5>
                    </Link>
                    <div className="post__detail">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="post__detail-price">
                          <Badge bg="info" className="price">
                            {`${post.price}/tháng`}
                          </Badge>
                        </div>
                        <div className="post__detail-area d-inline-flex align-items-center">
                          <FaChartArea />
                          <span className="ms-1">{`${post.area}m`}&sup2;</span>
                        </div>
                        <div className="post__detail-time d-inline-flex align-items-center">
                          <FaRegClock />
                          <span className="ms-1">
                            {getDate(post.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div className="post__detail-address mt-2">
                        <FaSearchLocation
                          style={{ width: "20", height: "20" }}
                          className="text-danger"
                        />
                        <span className="ms-1">{`${getDistrictName(
                          post.wardId
                        )}, Hà Nội`}</span>
                      </div>
                      <div className="post__detail-summary mt-2">
                        {post.content}
                      </div>
                    </div>
                    <div className="post__contact d-flex justify-content-between align-items-center my-2">
                      <div className="post__contact-name">
                        {post.user.username}
                      </div>
                      <div className="post__contact-phone">
                        <Badge bg="success" className="p-2">
                          <FaPhoneAlt className="me-1" />
                          {post.user.phone}
                        </Badge>
                      </div>
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ListGroup.Item></ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostsList;
