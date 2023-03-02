import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col"

import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

import { ACREAGE_RANGE } from "../../contexts/constants";

import "./acreagesList.scss";

const AcreagesList = () => {
  return (
    <div className="acreages-list">
      <Card>
        <Card.Body>
          <Card.Title>Xem theo diện tích</Card.Title>
          <ListGroup variant="flush">
            {ACREAGE_RANGE.map((acreage, i) => {
              if (i === 0) {
                return (
                  <>
                    <ListGroup.Item>
                      <div className="list-item">
                        <IoIosArrowForward className="list-item__icon" />
                        <Link className="list-item__text">
                          Dưới {acreage} m&sup2;
                        </Link>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="list-item">
                        <IoIosArrowForward className="list-item__icon" />
                        <Link className="list-item__text">
                          Từ {acreage} - {ACREAGE_RANGE[i + 1]} &sup2;
                        </Link>
                      </div>
                    </ListGroup.Item>
                  </>
                );
              } else if (i === ACREAGE_RANGE.length - 1) {
                return (
                  <ListGroup.Item>
                    <div className="list-item">
                      <IoIosArrowForward className="list-item__icon" />
                      <Link className="list-item__text">
                        Trên {acreage} &sup2;
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
                        Từ {acreage} - {ACREAGE_RANGE[i + 1]} &sup2;
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

export default AcreagesList;
