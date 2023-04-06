import React from "react";
import Button from "react-bootstrap/Button";
import { FaPlusCircle } from "react-icons/fa";

import "./fileUpload.scss";

const FileUpload = ({ uploadHandler }) => {


  return (
    <>
      <div className="file-card">
        <div
          className="file-inputs"
          onClick={() => document.querySelector(".input-file").click()}
        >
          <input
            type="file"
            accept="image/*"
            onChange={uploadHandler}
            className="input-file"
            hidden
            name="image"
            multiple
          />
          <Button>
            <FaPlusCircle className="upload-icon" />
            Thêm ảnh
          </Button>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
