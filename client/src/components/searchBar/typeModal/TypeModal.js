import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { apiUrl } from "../../../contexts/constants";
import axios from "axios";

import "./typeModal.scss";
import { useLocation, useParams } from "react-router-dom";

const TypeModal = ({ show, onHide, setType }) => {
  const [rentTypes, setRentTypes] = useState([]);
  const [typeChecked, setTypeChecked] = useState();

  const { type } = useParams();

  const { pathname } = useLocation();
  
  useEffect(() => {
    const getRentTypes = async () => {
      const response = await axios.get(`${apiUrl}/post/rentTypes`);
      setRentTypes(response.data.rentTypes);
    };

    getRentTypes();
  }, []);

  useEffect(() => {
    if (rentTypes.length !== 0) {
      setTypeChecked(rentTypes[0]._id);
      setType(rentTypes[0]);
    }
  }, [rentTypes, setType]);

  useEffect(() => {
    if (rentTypes.length !== 0) {
      if (type) {
        const typeFind = rentTypes.find(rentType => rentType._id === type);
        setTypeChecked(typeFind._id);
        setType(typeFind);
      } else if (pathname === "/") {
        setTypeChecked(rentTypes[0]._id);
        setType(rentTypes[0]);
      }
    }
  }, [rentTypes, type, setType, pathname]);

  const handleChecked = (e) => {
    setTypeChecked(e.target.id);
    const typeFind = rentTypes.find(rentType => rentType._id === e.target.id);
    setType(typeFind);
  };

  return (
    <>
     <Modal show={show} onHide={onHide}>
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
                  onClick={onHide}
                />
                <Form.Check.Label
                  as="button"
                  className={typeChecked === rentType._id ? "type-actived btn btn-link" : "btn btn-link" }
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

export default TypeModal;
