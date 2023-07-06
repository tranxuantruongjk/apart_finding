import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

import { PRICE_RANGE } from "../../contexts/constants";

import useSearchContext from "../../hooks/useSearchContext";

import "./pricesList.scss";

const PricesList = () => {
  const { changeSearchState } = useSearchContext();

  const handleClickPriceRange = (e, price1, price2 = 0) => {
    if (price2 === 0) {
      if (price1 === PRICE_RANGE[0]) {
        changeSearchState("minPriceVal", 0);
        changeSearchState("maxPriceVal", price1);
      } else {
        changeSearchState("minPriceVal", price1);
        changeSearchState("maxPriceVal", price1);
      }
    } else {
      changeSearchState("minPriceVal", price1);
      changeSearchState("maxPriceVal", price2);
    }
  };

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
                        <Link
                          to="/search"
                          className="list-item__text"
                          onClick={(e) => handleClickPriceRange(e, price)}
                        >
                          Dưới {price} triệu đồng
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
                            handleClickPriceRange(e, price, PRICE_RANGE[i + 1])
                          }
                        >
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
                      <Link
                        to="/search"
                        className="list-item__text"
                        onClick={(e) => handleClickPriceRange(e, price)}
                      >
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
                      <Link
                        to="/search"
                        className="list-item__text"
                        onClick={(e) =>
                          handleClickPriceRange(e, price, PRICE_RANGE[i + 1])
                        }
                      >
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
