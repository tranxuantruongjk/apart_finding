import { useContext } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { AuthContext } from "../../contexts/AuthContext";
import { PostContext } from "../../contexts/PostContext";
import FacebookIcon from "../../assets/images/facebook.svg";
import ZaloIcon from "../../assets/images/zalo.svg";
import YoutubeIcon from "../../assets/images/youtube.svg";
import { SiHomeassistant } from "react-icons/si";

import "./footer.scss";

const Footer = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const { rentTypes } = useContext(PostContext);

  return (
    <div className="footer">
      <div className="container footer-info">
        <Row xs={2} md={4}>
          <Col className="d-flex align-items-center justify-content-center mb-4">
            <Link
              to={user ? (user.role === 0 ? "/" : "/admin") : "/"}
              className="text-decoration-none"
            >
              <div className="logo">
                <SiHomeassistant className="logo-icon" />
                <span className="logo-text">TRỌ SV</span>
              </div>
            </Link>
          </Col>
          <Col className="d-flex flex-column mb-4">
            <div className="col-header">VỀ CHÚNG TÔI</div>
            <Link>Giới thiệu</Link>
            <Link>Quy chế hoạt động</Link>
            <Link>Quy định sử dụng</Link>
            <Link>Chính sách bảo mật</Link>
          </Col>
          <Col className="d-flex flex-column mb-4">
            <div className="col-header">HỆ THỐNG</div>
            {rentTypes &&
              rentTypes.map((rentType) => (
                <Link
                  key={rentType._id}
                  to={
                    user
                      ? user.role === 0
                        ? `/posts/type/${rentType._id}`
                        : "/admin/postsList"
                      : `/posts/type/${rentType._id}`
                  }
                >
                  {rentType.name}
                </Link>
              ))}
          </Col>
          <Col className="d-flex flex-column mb-4">
            <div className="col-header">KẾT NỐI VỚI CHÚNG TÔI</div>
            <div className="hotline">Hotline: 0987654321</div>
            <div className="email">Email: trosv@gmail.com</div>
            <div className="social-media d-flex">
              <img src={FacebookIcon} alt="facebook" />
              <img src={ZaloIcon} alt="zalo" />
              <img src={YoutubeIcon} alt="youtube" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="copyright border-top border-white text-center">
        <span>Copyright &#169; 2023</span>
      </div>
    </div>
  );
};

export default Footer;
