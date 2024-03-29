import React, { useContext, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import PostsList from "../../components/postsList/PostsList";
import TypesList from "../../components/typesList/TypesList";
import PricesList from "../../components/pricesList/PricesList";
import AcreagesList from "../../components/acreagesList/AcreagesList";
import DistrictsList from "../../components/districtsList/DistrictsList";
import Paging from "../../components/paging/Paging";
import HomeTop from "../../components/homeTop/HomeTop";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { PostContext } from "../../contexts/PostContext";

import "./home.scss";

const Home = () => {
  const { type } = useParams();
  const { pathname } = useLocation();

  const {
    postState: { posts, total, page, limit },
    getPosts,
    changePage,
  } = useContext(PostContext);

  useEffect(() => {
    changePage(1);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // Start: get all posts
  useEffect(() => {
    if (type) {
      getPosts(type);
    } else if (pathname === "/") {
      getPosts();
    }
  }, [type, pathname, page]);

  return (
    <div className="home pb-4">
      <HomeTop />
      <div className="container main-home mt-2">
        <Row>
          <Col md={8}>
            <PostsList posts={posts} />
            <Paging
              page={page}
              limit={limit}
              totalPosts={total}
              changePage={changePage}
            />
          </Col>
          <Col md={4}>
            <TypesList />
            <PricesList />
            <AcreagesList />
            <DistrictsList />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Card className="p-4">
              <Card.Body className="text-center">
                <h4>Bạn đang có phòng trọ / căn hộ muốn cho thuê?</h4>
                <p>Không phải lo tìm người cho thuê, phòng trống kéo dài</p>
                <Link to="/me/create">
                  <Button className="main-home-btn__post">Đăng tin ngay</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
