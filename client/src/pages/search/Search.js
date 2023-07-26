import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import PostsList from "../../components/postsList/PostsList";
import Utils from "../../components/utils/Utils";
import HomeTop from "../../components/homeTop/HomeTop";
import Paging from "../../components/paging/Paging";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import useSearchContext from "../../hooks/useSearchContext";

import "../home/home.scss";

const Search = () => {
  const {
    resultState: { posts, page, total, limit },
    addressState: { district, ward },
    searchState: {
      rentType,
      minPriceVal,
      maxPriceVal,
      minAcreageVal,
      maxAcreageVal,
      utils,
      gender,
    },
    changePage,
    searchPost,
  } = useSearchContext();

  useEffect(() => {
    const searchWithPage = async () => {
      const searchForm = {
        typeId: rentType._id,
        district: district,
        ward: ward,
        minPrice: minPriceVal,
        maxPrice: maxPriceVal,
        minAcreage: minAcreageVal,
        maxAcreage: maxAcreageVal,
        utils,
        gender,
      };

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      try {
        await searchPost(searchForm);
      } catch (error) {
        console.log(error);
      }
    };

    searchWithPage();
  }, [page]);

  return (
    <div className="home pb-4">
      <HomeTop />
      <div className="container main-home mt-2">
        <Row>
          <Col md={3}>
            <Utils />
          </Col>
          <Col md={9}>
            <PostsList posts={posts} />
            <Paging
              page={page}
              limit={limit}
              totalPosts={total}
              changePage={changePage}
            />
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

export default Search;
