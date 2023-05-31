import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

import { FaRegClock } from "react-icons/fa";
import { FaChartArea } from "react-icons/fa";
import { FaSearchLocation } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";

import { getDate } from "../../utils/post";

import "./postItem.scss";

const PostItem = ({ post, handleShow }) => {
  const {
    authState: { isAuthenticated, user },
    updateUserInfo,
  } = useContext(AuthContext);

  const saveRef = useRef();

  const handleSaveClick = async () => {
    if (!saveRef.current.classList.contains("saved")) {
      if (isAuthenticated) {
        saveRef.current.classList.add("saved");
        user.savedPost.push(post._id);
        await updateUserInfo(user._id, { savedPost: user.savedPost });
      } else {
        handleShow();
      }
    } else {
      saveRef.current.classList.remove("saved");
      user.savedPost = user.savedPost.filter((p) => p !== post._id);
      await updateUserInfo(user._id, { savedPost: user.savedPost });
    }
  };

  return (
    <div className="post-item">
      {post && (
        <Row>
          <Col md={5} className="post-item__thumb">
            <img
              src={post.files[0]}
              alt="anh"
              className="post-item__thumb__image"
            />
            <span className="image-number">{post.files.length} ảnh</span>
            <span className="post-save">
              <i
                ref={saveRef}
                className={
                  user && user.savedPost.includes(post._id) ? "saved" : ""
                }
                title="Lưu tin này"
                onClick={handleSaveClick}
              ></i>
            </span>
          </Col>
          <Col md={7}>
            <Link
              to={`/${post.rentType}/${post._id}`}
              className="text-decoration-none"
            >
              <h5 className="post-item__title">{post.title}</h5>
            </Link>
            <div className="post-item__detail">
              <div className="d-flex justify-content-between align-items-center">
                <div className="post-item__detail-price">
                  <Badge bg="info" className="price">
                    {`${post.price}/tháng`}
                  </Badge>
                </div>
                <div className="post-item__detail-area d-inline-flex align-items-center">
                  <FaChartArea />
                  <span className="ms-1">{`${post.area}m`}&sup2;</span>
                </div>
                <div className="post-item__detail-time d-inline-flex align-items-center">
                  <FaRegClock />
                  <span className="ms-1">{getDate(post.createdAt)}</span>
                </div>
              </div>
              <div className="post-item__detail-address mt-2">
                <FaSearchLocation
                  style={{ width: "20", height: "20" }}
                  className="text-danger"
                />
                <span className="ms-1">{`${post.fullAddressObject.ward.text}, 
                            ${post.fullAddressObject.district.text}, ${post.fullAddressObject.city.text}`}</span>
              </div>
              <div className="post-item__detail-summary mt-2">
                {post.content}
              </div>
            </div>
            <div className="post-item__contact d-flex justify-content-between align-items-center my-2">
              <div className="post-item__contact-name">
                {post.user.username}
              </div>
              <div className="post-item__contact-phone">
                <Badge bg="success" className="p-2">
                  <FaPhoneAlt className="me-1" />
                  {post.user.phone}
                </Badge>
              </div>
            </div>
          </Col>
        </Row>
        
      )}
    </div>
  );
};

export default PostItem;
