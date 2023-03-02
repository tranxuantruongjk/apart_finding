import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col"

import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

import { PRICE_RANGE } from "../../contexts/constants";

import "./pricesList.scss";

const PricesList = () => {
  return (
    <div className="prices-list">
      <Card>
        <Card.Body>
          <Card.Title>Xem theo giá</Card.Title>
          <ListGroup variant="flush">
            {PRICE_RANGE.map((price, i) => {
              if (i === 0) {
                return (
                  <>
                    <ListGroup.Item>
                      <div className="list-item">
                        <IoIosArrowForward className="list-item__icon" />
                        <Link className="list-item__text">
                          Dưới {price} triệu đồng
                        </Link>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="list-item">
                        <IoIosArrowForward className="list-item__icon" />
                        <Link className="list-item__text">
                          Từ {price} - {PRICE_RANGE[i + 1]} triệu đồng
                        </Link>
                      </div>
                    </ListGroup.Item>
                  </>
                );
              } else if (i === PRICE_RANGE.length - 1) {
                return (
                  <ListGroup.Item>
                    <div className="list-item">
                      <IoIosArrowForward className="list-item__icon" />
                      <Link className="list-item__text">
                        Trên {price} triệu đồng
                      </Link>
                    </div>
                  </ListGroup.Item>
                );
              } else {
                return (
                  <ListGroup.Item>
                    <div className="list-item">
                      <IoIosArrowForward className="list-item__icon" />
                      <Link className="list-item__text">
                        Từ {price} - {PRICE_RANGE[i + 1]} triệu đồng
                      </Link>
                    </div>
                  </ListGroup.Item>
                );
              }
            })}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PricesList;
