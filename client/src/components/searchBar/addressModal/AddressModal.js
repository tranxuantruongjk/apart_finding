import React from "react";
import Modal from "react-bootstrap/Modal";
import "./addressModal.scss";

import { MdArrowBack } from "react-icons/md";

import FormInputs from "./FormInputs";

import useAddressContext from "../../../hooks/useAddressContext";

const AddressModal = ({ show, onHide }) => {
  const {
    page,
    setPage,
    title,
  } = useAddressContext();

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

export default AddressModal;
