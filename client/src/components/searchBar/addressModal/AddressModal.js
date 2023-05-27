import React, { memo } from "react";
import Modal from "react-bootstrap/Modal";
import "./addressModal.scss";

import { MdArrowBack } from "react-icons/md";

import FormInputs from "./FormInputs";

import useSearchContext from "../../../hooks/useSearchContext";

const AddressModal = ({ show, onHide }) => {
  const {
    page,
    setPage,
    title,
  } = useSearchContext();

  const handlePrev = () => {
    if (page === 0) {
      onHide();
    } else {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <Modal show={show} onHide={onHide} scrollable>
      <Modal.Header closeButton>
        <MdArrowBack className="back-icon" onClick={handlePrev}/>
        <Modal.Title className="text-center">{title[page]}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormInputs />
      </Modal.Body>
    </Modal>
  )
};

export default memo(AddressModal);
