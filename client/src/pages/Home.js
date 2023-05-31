import React, { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import PostsList from "../components/postsList/PostsList";
import TypesList from "../components/typesList/TypesList";
import PricesList from "../components/pricesList/PricesList";
import AcreagesList from "../components/acreagesList/AcreagesList";
import Utils from "../components/utils/Utils";
import HomeTop from "../components/homeTop/HomeTop";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { PostContext } from "../contexts/PostContext";

const Home = () => {
  const { type } = useParams();
  const { pathname } = useLocation();

  const {
    postState: { posts, total, page },
    getPosts,
    changePage,
  } = useContext(PostContext);

  useEffect(() => {
    changePage(1);
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
    <div className="home">
      <HomeTop />
      <div className="container main-home my-3">
        <Row>
          {
            pathname === "/" ? (
              <>
                <Col md={8}>
                  <PostsList posts={posts} total={total} />
                </Col>
                <Col md={4}>
                  <TypesList />
                  <PricesList />
                  <AcreagesList />
                </Col>
              </>
            ) : (
              <>
                <Col md={3}>
                  <Utils />
                </Col>
                <Col md={9}>
                  <PostsList posts={posts} total={total} />
                </Col>
              </>
            )
          }
        </Row>
      </div>
    </div>
  );
};

export default Home;
