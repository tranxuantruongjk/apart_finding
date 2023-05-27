import React from "react";
import PostsList from "../components/postsList/PostsList";
import TypesList from "../components/typesList/TypesList";
import PricesList from "../components/pricesList/PricesList";
import AcreagesList from "../components/acreagesList/AcreagesList";
import Utils from "../components/utils/Utils";
import HomeTop from "../components/homeTop/HomeTop";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { pathname } = useLocation();

  return (
    <div className="home">
      <HomeTop />
      <div className="container main-home my-3">
        <Row>
          {
            pathname === "/" ? (
              <>
                <Col md={8}>
                  <PostsList />
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
                  <PostsList />
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
