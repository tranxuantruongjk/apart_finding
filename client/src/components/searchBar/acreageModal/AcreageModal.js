import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

import "./acreageModal.scss";

import MultiRangeSlider from "../../multiRangeSlider/MultiRangeSlider";

const AcreageModal = ({
  show,
  onHide,
  minAcreage,
  maxAcreage,
  minAcreageVal,
  maxAcreageVal,
  setMinAcreageVal,
  setMaxAcreageVal,
  handleClickAcreage,
}) => {

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Chọn giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="acreage-result">{`${minAcreageVal} - ${maxAcreageVal} m`}&sup2;</div>
          <MultiRangeSlider
            min={minAcreage}
            max={maxAcreage}
            minVal={minAcreageVal}
            maxVal={maxAcreageVal}
            setMinVal={setMinAcreageVal}
            setMaxVal={setMaxAcreageVal}
          />
          <Button variant="primary" className="btn-acreage" onClick={handleClickAcreage}>Áp dụng</Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AcreageModal;
