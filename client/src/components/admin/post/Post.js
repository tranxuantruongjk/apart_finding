import React, { useEffect, useState, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { AdminPostContext } from "../../../contexts/admin/PostContext";
import { useParams, useNavigate } from "react-router-dom";
import ActionModal from "../actionModal/ActionModal";

import { HiHome } from "react-icons/hi";
import { MdRoomPreferences } from "react-icons/md";
import { AiFillInfoCircle } from "react-icons/ai";
import { RiContactsFill } from "react-icons/ri";

import { getDetailDateTime } from "../../../utils/post";
import { utilities } from "../../../utils/post";

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
            <Col md={12}>
              <div className="detail-post">
                <div className="detail-post__images">
                  <Carousel>
                    {post.images &&
                      post.images.map((image, i) => (
                        <Carousel.Item key={i}>
                          <img
                            className="post-img"
                            src={image}
                            alt="First slide"
                          />
                        </Carousel.Item>
                      ))}
                    {post.videos &&
                      post.videos.map((video, i) => (
                        <Carousel.Item key={i}>
                          <video src={video} controls className="post-img" />
                        </Carousel.Item>
                      ))}
                  </Carousel>
                </div>
                <h2 className="detail-post__title">{post.title}</h2>
                <div className="detail-post__overview">
                  <div className="detail-post__overview-header">
                    <div className="header-icon">
                      <HiHome className="icon" />
                    </div>
                    <span>Thông tin phòng</span>
                  </div>
                  <div className="detail-post__overview-table">
                    <Table hover>
                      <tbody>
                        <tr>
                          <td>Địa chỉ</td>
                          <td className="info">{post.address}</td>
                        </tr>
                        <tr>
                          <td>Giá</td>
                          <td className="info">{`${post.price} VND/tháng`}</td>
                        </tr>
                        <tr>
                          <td>Chuyên mục</td>
                          <td className="info">{post.rentType.name}</td>
                        </tr>
                        <tr>
                          <td>Diện tích</td>
                          <td className="info">
                            {post.area} m<sup>2</sup>
                          </td>
                        </tr>
                        <tr>
                          <td>Đối tượng cho thuê</td>
                          <td className="info">
                            {post.gender === "male"
                              ? "Nam"
                              : post.gender === "female"
                              ? "Nữ"
                              : "Bất kỳ"}
                          </td>
                        </tr>
                        <tr>
                          <td>Ngày cập nhật</td>
                          <td className="info">
                            {getDetailDateTime(post.createdAt)}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
                <div className="detail-post__utils">
                  <div className="detail-post__utils-header">
                    <div className="header-icon">
                      <MdRoomPreferences className="icon" />
                    </div>
                    <span>Tiện ích</span>
                  </div>
                  <div className="detail-post__utils-items">
                    <Row xs={2} sm={2} md={3} lg={4}>
                      {post.utils.map((util) => {
                        const item = utilities.find((u) => u.id === util);
                        return (
                          <Col key={item.id} className="item">
                            {item.icon}
                            <span>{item.title}</span>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                </div>
                <div className="detail-post__description">
                  <div className="detail-post__description-header">
                    <div className="header-icon">
                      <AiFillInfoCircle className="icon" />
                    </div>
                    <span>Mô tả thêm</span>
                  </div>
                  <p
                    style={{ whiteSpace: "pre-line" }}
                    className="detail-post__description-content"
                  >
                    {post.content}
                  </p>
                </div>
                <div className="detail-post__contact">
                  <div className="detail-post__contact-header">
                    <div className="header-icon">
                      <RiContactsFill className="icon" />
                    </div>
                    <span>Thông tin liên hệ</span>
                  </div>
                  <div className="detail-post__contact-table">
                    <Table striped hover>
                      <tbody>
                        <tr>
                          <th scope="row">Liên hệ</th>
                          <td>{post.user.username}</td>
                        </tr>
                        <tr>
                          <th scope="row">Điện thoại</th>
                          <td>{post.user.phone}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
                <div className="detail-post__map">
                  <h3>Bản đồ</h3>
                  <div id="maps" style={{ height: "300px", width: "100%" }}>
                    <iframe
                      title="frame-detail-address"
                      width="100%"
                      height="100%"
                      style={{ border: "0" }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=${post.address}`}
                    ></iframe>
                  </div>
                </div>
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
