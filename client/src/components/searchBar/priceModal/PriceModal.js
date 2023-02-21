import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

import "./priceModal.scss";

import MultiRangeSlider from "../../multiRangeSlider/MultiRangeSlider";

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
  // console.log(minVal, maxVal);

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
          <Button variant="primary" className="btn-price" onClick={handleClickPrice}>Áp dụng</Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PriceModal;
