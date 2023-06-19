import React, { useState, useContext, useEffect, memo } from "react";
import { useLocation, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../../contexts/PostContext";
import useSearchContext from "../../../hooks/useSearchContext";

import "./typeModal.scss";

const TypeModal = ({ show, setShowTypeModal }) => {
  const { rentTypes } = useContext(PostContext);
  const {
    searchState: { rentType },
    changeSearchState,
  } = useSearchContext();

  const [typeChecked, setTypeChecked] = useState();

  const { type } = useParams();

  const handleChecked = (e) => {
    setTypeChecked(e.target.id);
    const typeFind = rentTypes.find((rentType) => rentType._id === e.target.id);
    changeSearchState("rentType", typeFind);
  };

  useEffect(() => {
    if (rentTypes.length !== 0) {
      if (type) {
        const typeFind = rentTypes.find((rentType1) => rentType1._id === type);
        setTypeChecked(typeFind._id);
        changeSearchState("rentType", typeFind);
      } else {
        setTypeChecked();
      }
    }
  }, [rentTypes, type, rentType]);

  const closeTypeModal = () => {
    setShowTypeModal(false);
  };

  return (
    <>
      <Modal show={show} onHide={closeTypeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Chọn loại</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {rentTypes.map((rentType) => (
              <Form.Check
                key={rentType._id}
                type="radio"
                className={`border-bottom border-secondary py-2`}
              >
                <Form.Check.Input
                  type="radio"
                  name="type"
                  checked={typeChecked === rentType._id}
                  id={`${rentType._id}`}
                  onChange={handleChecked}
                  onClick={closeTypeModal}
                />
                <Form.Check.Label
                  as="button"
                  className={
                    typeChecked === rentType._id
                      ? "type-actived btn btn-link"
                      : "btn btn-link"
                  }
                  htmlFor={`${rentType._id}`}
                >{`${rentType.name}`}</Form.Check.Label>
              </Form.Check>
            ))}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default memo(TypeModal);
