import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import PostsList from "../../components/postsList/PostsList";
import TypesList from "../../components/typesList/TypesList";
import PricesList from "../../components/pricesList/PricesList";
import AcreagesList from "../../components/acreagesList/AcreagesList";
import Utils from "../../components/utils/Utils";
import HomeTop from "../../components/homeTop/HomeTop";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { SmallPostItem } from "../../components/postItem/PostItem";

import { PostContext } from "../../contexts/PostContext";

import "./home.scss";

const Home = () => {
  const { type } = useParams();
  const { pathname } = useLocation();
  const [postsWithVideos, setPostsWithVideos] = useState([]);

  const {
    postState: { posts, total, page },
    getPosts,
    changePage,
    getPostsWithVideos,
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

  useEffect(() => {
    if (posts) {
      const getPosts = async () => {
        const result = await getPostsWithVideos();

        setPostsWithVideos(result.posts);
      };

      getPosts();
    }
  }, []);

  return (
    <div className="home bg-color pb-4">
      <HomeTop />
      <div className="container main-home mt-3">
        <Row>
          {pathname === "/" ? (
            <>
              <Col md={8}>
                <PostsList posts={posts} total={total} />
              </Col>
              <Col md={4}>
                <TypesList />
                <PricesList />
                <AcreagesList />
                <div className="posts-with-videos">
                  <Card>
                    <Card.Body>
                      <Card.Title>Tin đăng có video</Card.Title>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="border-danger" />
                        {postsWithVideos &&
                          postsWithVideos.map((post) => (
                            <ListGroup.Item
                              key={post._id}
                              className="border-danger"
                            >
                              <SmallPostItem post={post} />
                            </ListGroup.Item>
                          ))}
                        <ListGroup.Item></ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
              <Row className="mt-5">
                <Col>
                  <Card className="p-4">
                    <Card.Body className="text-center">
                      <h4>Bạn đang có phòng trọ / căn hộ muốn cho thuê?</h4>
                      <p>
                        Không phải lo tìm người cho thuê, phòng trống kéo dài
                      </p>
                      <Link to="/me/create">
                        <Button className="main-home-btn__post">
                          Đăng tin ngay
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
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
          )}
        </Row>
      </div>
    </div>
  );
};

export default Home;
