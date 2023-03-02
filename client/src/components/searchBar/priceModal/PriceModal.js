import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./priceModal.scss";

import MultiRangeSlider from "../../multiRangeSlider/MultiRangeSlider";

import { PRICE_RANGE } from "../../../contexts/constants";

const PriceModal = ({
  show,
  onHide,
  minPrice,
  maxPrice,
  minPriceVal,
  maxPriceVal,
  setMinPriceVal,
  setMaxPriceVal,
  handleClickPrice,
}) => {
  const handleClick = (e, price1, price2 = 0) => {
    const btnRangesList = document.getElementsByClassName("price-range-item");
    const btnRangesFilter = Object.values(btnRangesList).filter(
      (btnRange) => btnRange !== e.target
    );
    for (let btnRange of btnRangesFilter) {
      btnRange.classList.remove("active");
    }
    e.target.classList.add("active");

    if (price2 === 0) {
      if (price1 === PRICE_RANGE[0]) {
        setMinPriceVal(0);
        setMaxPriceVal(price1);
      } else {
        setMinPriceVal(price1);
        setMaxPriceVal(price1);
      }
    } else {
      setMinPriceVal(price1);
      setMaxPriceVal(price2);
    }
  };

  useEffect(() => {
    const btnRangesList = Object.values(
      document.getElementsByClassName("price-range-item")
    );
    if (btnRangesList.length !== 0) {
      if (minPriceVal === 0 && maxPriceVal === PRICE_RANGE[0]) {
        btnRangesList[0].classList.add("active");
        const btnRangesFilter = btnRangesList.filter(
          (btnRange) => btnRange !== btnRangesList[0]
        );
        for (let btnRange of btnRangesFilter) {
          btnRange.classList.remove("active");
        }
      } else if (
        minPriceVal === maxPriceVal &&
        minPriceVal === PRICE_RANGE[PRICE_RANGE.length - 1]
      ) {
        btnRangesList[btnRangesList.length - 1].classList.add("active");
        const btnRangesFilter = btnRangesList.filter(
          (btnRange) => btnRange !== btnRangesList[btnRangesList.length - 1]
        );
        for (let btnRange of btnRangesFilter) {
          btnRange.classList.remove("active");
        }
      } else if (
        PRICE_RANGE.includes(minPriceVal) &&
        PRICE_RANGE.includes(maxPriceVal)
      ) {
        const minIndex = PRICE_RANGE.findIndex((e) => e === minPriceVal);
        const maxIndex = PRICE_RANGE.findIndex((e) => e === maxPriceVal);
        if (minIndex === maxIndex - 1) {
          btnRangesList[minIndex + 1].classList.add("active");
          const btnRangesFilter = btnRangesList.filter(
            (btnRange) => btnRange !== btnRangesList[minIndex + 1]
          );
          for (let btnRange of btnRangesFilter) {
            btnRange.classList.remove("active");
          }
        }
      } else {
        for (let btnRange of btnRangesList) {
          btnRange.classList.remove("active");
        }
      }
    }
  }, [show, minPriceVal, maxPriceVal]);

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Chọn giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="price-result">{`${minPriceVal} - ${maxPriceVal} triệu`}</div>
          <MultiRangeSlider
            min={minPrice}
            max={maxPrice}
            minVal={minPriceVal}
            maxVal={maxPriceVal}
            setMinVal={setMinPriceVal}
            setMaxVal={setMaxPriceVal}
          />
          <div className="price-range">
            <Row xs={2} md={3}>
              {PRICE_RANGE.map((price, i) => {
                if (i === 0) {
                  return (
                    <>
                      <Col className="price-range-col">
                        <Button
                          variant="light"
                          className="price-range-item"
                          onClick={(e) => handleClick(e, price)}
                        >
                          Dưới {price} triệu đồng
                        </Button>
                      </Col>
                      <Col className="price-range-col">
                        <Button
                          variant="light"
                          className="price-range-item"
                          onClick={(e) =>
                            handleClick(e, price, PRICE_RANGE[i + 1])
                          }
                        >
                          Từ {price} - {PRICE_RANGE[i + 1]} triệu đồng
                        </Button>
                      </Col>
                    </>
                  );
                } else if (i === PRICE_RANGE.length - 1) {
                  return (
                    <Col className="price-range-col">
                      <Button
                        variant="light"
                        className="price-range-item"
                        onClick={(e) => handleClick(e, price)}
                      >
                        Trên {price} triệu đồng
                      </Button>
                    </Col>
                  );
                } else {
                  return (
                    <Col className="price-range-col">
                      <Button
                        variant="light"
                        className="price-range-item"
                        onClick={(e) =>
                          handleClick(e, price, PRICE_RANGE[i + 1])
                        }
                      >
                        Từ {price} - {PRICE_RANGE[i + 1]} triệu đồng
                      </Button>
                    </Col>
                  );
                }
              })}
            </Row>
          </div>
          <Button
            variant="primary"
            className="btn-price"
            onClick={handleClickPrice}
          >
            Áp dụng
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PriceModal;
