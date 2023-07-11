import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card as CardStrap,
  CardBody,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import Chart from "react-apexcharts";

import { AdminPostContext } from "../../../contexts/admin/PostContext";
import { UserContext } from "../../../contexts/admin/UserContext";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import users_icon from "../../../assets/images/ic_glass_users.png";
import posts_icon from "../../../assets/images/iconly-glass-paper.svg";
import types_icon from "../../../assets/images/iconly-glass-info.svg";
import { BsArrowRight } from "react-icons/bs";

import "./starter.scss";

const Starter = () => {
  const { statisticUser } = useContext(UserContext);
  const { getRentTypes, statisticPost } = useContext(AdminPostContext);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalTypes, setTotalTypes] = useState(0);
  const [userSeries, setUserSeries] = useState(null);
  const [postSeries, setPostSeries] = useState(null);

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    legend: {
      show: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 2,
      },
    },
    colors: ["#0d6efd", "#009efb", "#6771dc"],
    xaxis: {
      categories: [
        "T1",
        "T2",
        "T3",
        "T4",
        "T5",
        "T6",
        "T7",
        "T8",
        "T9",
        "T10",
        "T11",
        "T12",
      ],
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "60%",
              borderRadius: 7,
            },
          },
        },
      },
    ],
  };

  useEffect(() => {
    const statistic = async () => {
      const response = await statisticUser();

      const fullYear = new Date().getFullYear();
      const month = new Date().getMonth();
      setTotalUsers(response.total);
      setUserSeries([
        {
          name: fullYear,
          data: response.statistic.slice(0, month + 1),
        },
      ]);
    };

    statistic();
  }, []);

  useEffect(() => {
    const statistic = async () => {
      const response = await statisticPost();

      const fullYear = new Date().getFullYear();
      const month = new Date().getMonth();
      setTotalPosts(response.total);
      setPostSeries([
        {
          name: fullYear,
          data: response.statistic.slice(0, month + 1),
        },
      ]);
    };

    statistic();
  }, []);

  useEffect(() => {
    const getTypes = async () => {
      const response = await getRentTypes();

      setTotalTypes(response.rentTypes.length);
    };

    getTypes();
  }, []);

  return (
    <div className="starter">
      <div className="starter__header">
        <h5 className="fw-bold">Dashboard</h5>
      </div>
      <div className="starter__total">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <img
                      src={users_icon}
                      alt="users-icon"
                      className="users-icon"
                    />
                  </Col>
                  <Col md={8}>
                    <p className="mb-0">Người dùng</p>
                    <h5>{totalUsers && totalUsers}</h5>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <Link to="/admin/usersList" className="detail-button">
                  Xem chi tiết <BsArrowRight />
                </Link>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <img
                      src={posts_icon}
                      alt="posts-icon"
                      className="posts-icon"
                    />
                  </Col>
                  <Col md={8}>
                    <p className="mb-0">Bài đăng</p>
                    <h5>{totalPosts && totalPosts}</h5>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <Link to="/admin/postsList" className="detail-button">
                  Xem chi tiết <BsArrowRight />
                </Link>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <img
                      src={types_icon}
                      alt="types-icon"
                      className="types-icon"
                    />
                  </Col>
                  <Col md={8}>
                    <p className="mb-0">Loại phòng</p>
                    <h5>{totalTypes && totalTypes}</h5>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <Link to="/admin/rentTypesList" className="detail-button">
                  Xem chi tiết <BsArrowRight />
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="starter__chart">
        <Row>
          <Col>
            <CardStrap>
              <CardBody>
                <CardTitle tag="h5">Người dùng</CardTitle>
                <CardSubtitle className="text-muted" tag="h6">
                  Báo cáo thống kê người dùng
                </CardSubtitle>
                <div className="bg-primary text-white my-3 p-3 rounded">
                  <Row>
                    <Col md="4">
                      <h6>Tổng</h6>
                      <h4 className="mb-0 fw-bold">
                        {totalUsers && totalUsers}
                      </h4>
                    </Col>
                    <Col md="4">
                      <h6>Năm nay</h6>
                      <h4 className="mb-0 fw-bold">
                        {userSeries &&
                          userSeries[0].data.reduce((total, a) => total + a, 0)}
                      </h4>
                    </Col>
                    <Col md="4">
                      <h6>Tháng này</h6>
                      <h4 className="mb-0 fw-bold">
                        {userSeries &&
                          userSeries[0].data[userSeries[0].data.length - 1]}
                      </h4>
                    </Col>
                  </Row>
                </div>
                {userSeries && (
                  <Chart
                    options={options}
                    series={userSeries}
                    type="area"
                    height="279"
                  />
                )}
              </CardBody>
            </CardStrap>
          </Col>
          <Col>
            <CardStrap>
              <CardBody>
                <CardTitle tag="h5">Bài đăng</CardTitle>
                <CardSubtitle className="text-muted" tag="h6">
                  Báo cáo thống kê bài đăng
                </CardSubtitle>
                <div className="bg-primary text-white my-3 p-3 rounded">
                  <Row>
                    <Col md="4">
                      <h6>Tổng</h6>
                      <h4 className="mb-0 fw-bold">
                        {totalPosts && totalPosts}
                      </h4>
                    </Col>
                    <Col md="4">
                      <h6>Năm nay</h6>
                      <h4 className="mb-0 fw-bold">
                        {postSeries &&
                          postSeries[0].data.reduce((total, a) => total + a, 0)}
                      </h4>
                    </Col>
                    <Col md="4">
                      <h6>Tháng này</h6>
                      <h4 className="mb-0 fw-bold">
                        {postSeries &&
                          postSeries[0].data[postSeries[0].data.length - 1]}
                      </h4>
                    </Col>
                  </Row>
                </div>
                {postSeries && (
                  <Chart
                    options={options}
                    series={postSeries}
                    type="area"
                    height="279"
                  />
                )}
              </CardBody>
            </CardStrap>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Starter;
