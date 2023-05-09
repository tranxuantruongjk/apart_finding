import React, { useEffect, useState, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { FaRegClock } from "react-icons/fa";
import { FaChartArea } from "react-icons/fa";
import { FaSearchLocation } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { MdAttachMoney } from "react-icons/md";
import zaloIcon from "../../assets/images/zalo-icon.png";
import "./detailPost.scss";
import axios from "axios";
import { apiUrl } from "../../contexts/constants";
import { getWardDistrictName, getDetailDateTime } from "../../utils/post";

const DetailPost = () => {
  const { type, id } = useParams();

  const saveRef = useRef(null);

  const [post, setPost] = useState(null);
  useEffect(() => {
    const getDetail = async () => {
      const response = await axios.get(`${apiUrl}/posts/${type}/${id}`);

      setPost(response.data.post);
    };
    getDetail();
  }, [type, id]);

  const handleSaveClick = () => {
    if (!saveRef.current.childNodes[0].classList.contains("saved")) {
      saveRef.current.childNodes[0].classList.add("saved");
    } else {
      saveRef.current.childNodes[0].classList.remove("saved");
    }
  };

  return (
    <div className="container mt-3">
      {post && (
        <>
          <Row>
            <Col md={8}>
              <div className="post">
                <div className="post__images">
                  <Carousel>
                    {post.files.map((file) => (
                      <Carousel.Item key={file._id}>
                        {file.type === "image" ? (
                          <img
                            className="post-img"
                            src={file.file}
                            alt="First slide"
                          />
                        ) : (
                          <video src={file.file} controls className="post-img"/>
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
                    <div
                      ref={saveRef}
                      onClick={handleSaveClick}
                      className="post--save d-inline-flex align-items-center"
                    >
                      <FaHeart className="heart-icon" />
                      Lưu tin
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
        </>
      )}
    </div>
  );
};

export default DetailPost;
