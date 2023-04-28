import React, { useEffect, useState, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { AdminPostContext } from "../../../contexts/admin/PostContext";
import { useParams, useNavigate } from "react-router-dom";
import ActionModal from "../actionModal/ActionModal";

import {
  FaRegClock,
  FaChartArea,
  FaSearchLocation,
  FaPhoneAlt,
} from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { MdAttachMoney } from "react-icons/md";
import zaloIcon from "../../../assets/images/zalo-icon.png";

import { getDetailDateTime, getWardDistrictName } from "../../../utils/post";

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [action, setAction] = useState(null);

  const { getPost, acceptPost, rejectPost, deletePost } =
    useContext(AdminPostContext);

  useEffect(() => {
    const getPostInfo = async (id) => {
      const response = await getPost(id);

      setPost(response.post);
    };

    getPostInfo(id);
  }, [id]);

  const handleActionAccept = (postId) => {
    setShowActionModal(true);
    setAction({
      object: postId,
      action: acceptPost,
      message: "Bạn chắc chắn muốn duyệt bài đăng này?",
      button: "Xác nhận",
      setPost: setPost,
      success: false,
    });
  };

  const handleActionReject = (postId) => {
    setShowActionModal(true);
    setAction({
      object: postId,
      action: rejectPost,
      message: "Bạn chắc chắn muốn từ chối bài đăng này?",
      button: "Xác nhận",
      setPost: setPost,
      success: false,
    });
  };

  const handleActionDelete = (postId) => {
    setShowActionModal(true);
    setAction({
      object: postId,
      action: deletePost,
      message: "Bạn chắc chắn muốn xóa bài đăng này?",
      button: "Xác nhận",
      setPost: setPost,
      success: false,
    });
  };

  useEffect(() => {
    if (action && action.action.name === "deletePost" && action.success) {
      navigate("/admin/postsList");
    }
  }, [action, setAction]);

  return (
    <div>
      <div className="mb-3">
        <h5 className="fw-bold">Thông tin chi tiết</h5>
      </div>
      {post && (
        <>
          <Row>
            <span className="fw-semibold mb-3">
              Trạng thái:
              <span
                className={`${
                  post.state === "pending"
                    ? "pending"
                    : post.state === "accepted"
                    ? "accepted"
                    : "rejected"
                } ms-2`}
              >
                {post.state}
              </span>
            </span>
          </Row>
          <Row>
            <Col md={8}>
              <div className="post">
                <div className="post__images">
                  <Carousel>
                    {post.files.map((file) => (
                      <Carousel.Item key={file._id}>
                        {file.type === "image" ? (
                          <img className="post-img" src={file.file} alt="slider" />
                        ) : (
                          <video
                            src={file.file}
                            controls
                            className="post-img"
                          />
                        )}
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
                <div className="post__overview mt-2">
                  <h2 className="post__overview-title">{post.title}</h2>
                  <div className="post__overview-type mb-1">
                    <span className="fw-bold">Chuyên mục:</span>{" "}
                    {post.rentType.name}
                  </div>
                  <div className="post__overview-address mb-1">
                    <FaSearchLocation className="text-primary me-1" />
                    <span className="fw-bold">Địa chỉ:</span>{" "}
                    {`${post.address}, ${getWardDistrictName(post.wardId)}`}
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-inline-flex align-items-center">
                      <MdAttachMoney className="cash-icon" />
                      <span className="price">{post.price}/tháng</span>
                    </div>
                    <div className="d-inline-flex align-items-center">
                      <FaChartArea className="area-icon" />
                      {post.area}m&sup2;
                    </div>
                    <div className="d-inline-flex align-items-center">
                      <FaRegClock className="clock-icon" />
                      {getDetailDateTime(post.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="post__description">
                  <h3>Thông tin mô tả</h3>
                  <p style={{ whiteSpace: "pre-line" }}>{post.content}</p>
                </div>
                <div className="post__contact">
                  <h3>Thông tin liên hệ</h3>
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <th scope="row">Liên hệ</th>
                        <td>{post.user.username}</td>
                      </tr>
                      <tr>
                        <th scope="row">Điện thoại</th>
                        <td>{post.user.phone}</td>
                      </tr>
                      <tr>
                        <th scope="row">Zalo</th>
                        <td>{post.user.phone}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="contact-info">
                <div className="avatar">
                  <RxAvatar className="avatar-img" />
                </div>
                <h4 className="name">{post.user.username}</h4>
                <Button
                  variant="success"
                  className="phone"
                  as="a"
                  href={`tel:${post.user.phone}`}
                >
                  <FaPhoneAlt className="phone-icon" />
                  <span className="phone-number">{post.user.phone}</span>
                </Button>
                <Button
                  variant="light"
                  className="zalo"
                  as="a"
                  target="_blank"
                  href={`https://zalo.me/${post.user.phone}`}
                >
                  <img src={zaloIcon} alt="zalo-icon" className="zalo-icon" />
                  <span className="zalo-text">Zalo</span>
                </Button>
              </div>
            </Col>
          </Row>
          <div className="mt-5 text-center">
            {post.state === "pending" ? (
              <>
                <Button
                  className="post-action"
                  onClick={() => handleActionAccept(post._id)}
                >
                  Duyệt
                </Button>
                <Button
                  variant="danger"
                  className="post-action ms-3"
                  onClick={() => handleActionReject(post._id)}
                >
                  Từ chối
                </Button>
              </>
            ) : (
              <Button
                variant="secondary"
                className="post-action"
                onClick={() => handleActionDelete(post._id)}
              >
                Xóa
              </Button>
            )}
          </div>
          <ActionModal
            showActionModal={showActionModal}
            setShowActionModal={setShowActionModal}
            action={action}
            setAction={setAction}
          />
        </>
      )}
    </div>
  );
};

export default Post;
