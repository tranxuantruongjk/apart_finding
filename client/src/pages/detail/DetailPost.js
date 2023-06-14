import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Carousel from "react-bootstrap/Carousel";
import Modal from "react-bootstrap/Modal";

import { FaPhoneAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { MdRoomPreferences } from "react-icons/md";
import { HiHome } from "react-icons/hi";
import { AiFillInfoCircle } from "react-icons/ai";
import { RiContactsFill } from "react-icons/ri";
import "./detailPost.scss";

import { apiUrl } from "../../contexts/constants";
import { getDetailDateTime } from "../../utils/post";
import { utilities } from "../../utils/post";

const DetailPost = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();

  const {
    authState: { isAuthenticated, user },
    updateUserInfo,
  } = useContext(AuthContext);

  const [showLoginRequestModal, setShowLoginRequestModal] = useState(false);

  const saveRef = useRef(null);

  const [post, setPost] = useState(null);
  const [postSaved, setPostSaved] = useState(
    <FaRegHeart className="heart-icon" />
  );

  const handleClose = () => setShowLoginRequestModal(false);
  const handleShow = () => setShowLoginRequestModal(true);

  useEffect(() => {
    const getDetail = async () => {
      const response = await axios.get(`${apiUrl}/posts/${type}/${id}`);

      setPost(response.data.post);
    };
    getDetail();
  }, [type, id]);

  const handleSaveClick = async () => {
    if (!saveRef.current.classList.contains("save-click")) {
      if (isAuthenticated) {
        saveRef.current.classList.add("save-click");
        setPostSaved(<FaHeart className="heart-icon saved" />);
        user.savedPost.push(post._id);
        await updateUserInfo(user._id, { savedPost: user.savedPost });
      } else {
        handleShow();
      }
    } else {
      saveRef.current.classList.remove("save-click");
      setPostSaved(<FaRegHeart className="heart-icon" />);
      user.savedPost = user.savedPost.filter((p) => p !== post._id);
      await updateUserInfo(user._id, { savedPost: user.savedPost });
    }
  };

  useEffect(() => {
    if (post && user && user.savedPost.includes(post._id)) {
      saveRef.current.classList.add("save-click");
      setPostSaved(<FaHeart className="heart-icon saved" />);
    }
  }, [post]);

  // const [pos, setPos] = useState(null);
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     };

  //     // console.log(pos);
  //     setPos(pos);
  //   });
  // }, []);

  return (
    <div className="bg-color">
      <div className="container mt-3">
        {post && (
          <>
            <Row className="mb-5">
              <Col md={8}>
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
                      <Row sm={2} md={3} lg={3}>
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
              <Col md={4}>
                <div className="contact-info">
                  <h4 className="title">Liên hệ chủ trọ</h4>
                  <div className="user-info">
                    <RxAvatar className="avatar" />
                    <h5 className="name">{post.user.username}</h5>
                  </div>
                  <Button
                    variant="light"
                    className="phone"
                    as="a"
                    href={`tel:${post.user.phone}`}
                  >
                    <FaPhoneAlt className="phone-icon" />
                    <span className="phone-number">{post.user.phone}</span>
                  </Button>
                  <Button
                    variant="light"
                    ref={saveRef}
                    onClick={handleSaveClick}
                    className="post--save"
                  >
                    {postSaved}
                    <span className="save-text">Lưu tin</span>
                  </Button>
                </div>
              </Col>
            </Row>
            <Modal
              show={showLoginRequestModal}
              onHide={handleClose}
              className="login-request-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title>Vui lòng đăng nhập</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Vui lòng đăng nhập hoặc đăng ký để lưu tin
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => navigate("/login")}>Đăng nhập</Button>
                <Button onClick={() => navigate("/register")}>Đăng ký</Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailPost;
