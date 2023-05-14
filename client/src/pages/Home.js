import React from "react";
import PostsList from "../components/postsList/PostsList";
import TypesList from "../components/typesList/TypesList";
import PricesList from "../components/pricesList/PricesList";
import AcreagesList from "../components/acreagesList/AcreagesList";
import HomeTop from "../components/homeTop/HomeTop";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  return (
    <div className="home">
      <HomeTop />
      <div className="container main-home my-3">
        <Row>
          <Col md={8}>
            <PostsList />
          </Col>
          <Col md={4}>
            <TypesList />
            <PricesList />
            <AcreagesList />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
