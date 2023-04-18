import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import "./toastMessage.scss";

const ToastMessage = ({ info }) => {
  return info === null ? null : (
    <ToastContainer>
      <Toast bg={info.type}>
        <Toast.Body>{info.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
