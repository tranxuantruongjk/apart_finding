import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

import { ACREAGE_RANGE } from "../../contexts/constants";

import useSearchContext from "../../hooks/useSearchContext";

import "./acreagesList.scss";

const AcreagesList = () => {
  const { changeSearchState } = useSearchContext();

  const handleClickAcreageRange = (e, acreage1, acreage2 = 0) => {
    if (acreage2 === 0) {
      if (acreage1 === ACREAGE_RANGE[0]) {
        changeSearchState("minAcreageVal", 0);
        changeSearchState("maxAcreageVal", acreage1);
      } else {
        changeSearchState("minAcreageVal", acreage1);
        changeSearchState("maxAcreageVal", acreage1);
      }
    } else {
      changeSearchState("minAcreageVal", acreage1);
      changeSearchState("maxAcreageVal", acreage2);
    }
  };

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
                        <Link
                          to="/search"
                          className="list-item__text"
                          onClick={(e) => handleClickAcreageRange(e, acreage)}
                        >
                          Dưới {acreage}m&sup2;
                        </Link>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="list-item">
                        <IoIosArrowForward className="list-item__icon" />
                        <Link
                          to="/search"
                          className="list-item__text"
                          onClick={(e) =>
                            handleClickAcreageRange(
                              e,
                              acreage,
                              ACREAGE_RANGE[i + 1]
                            )
                          }
                        >
                          Từ {acreage}m&sup2; - {ACREAGE_RANGE[i + 1]}m&sup2;
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
                      <Link
                        to="/search"
                        className="list-item__text"
                        onClick={(e) => handleClickAcreageRange(e, acreage)}
                      >
                        Trên {acreage}m&sup2;
                      </Link>
                    </div>
                  </ListGroup.Item>
                );
              } else {
                return (
                  <ListGroup.Item>
                    <div className="list-item">
                      <IoIosArrowForward className="list-item__icon" />
                      <Link
                        to="/search"
                        className="list-item__text"
                        onClick={(e) =>
                          handleClickAcreageRange(
                            e,
                            acreage,
                            ACREAGE_RANGE[i + 1]
                          )
                        }
                      >
                        Từ {acreage}m&sup2; - {ACREAGE_RANGE[i + 1]}m&sup2;
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
