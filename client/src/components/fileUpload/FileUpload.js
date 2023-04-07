import React from "react";
import Button from "react-bootstrap/Button";
import { FaPlusCircle } from "react-icons/fa";
import { RiVideoUploadFill } from "react-icons/ri";

import "./fileUpload.scss";

const FileUpload = ({ type, uploadHandler }) => {
  return (
    <>
      <div className="file-card">
        <div
          className="file-inputs"
          onClick={() => document.querySelector(`.input-${type}`).click()}
        >
          <input
            type="file"
            accept={`${type}/*`}
            onChange={uploadHandler}
            className={`input-${type}`}
            hidden
            name="files"
            multiple
          />
          <Button className="btn-upload-file">
            {type === "image" ? (
              <>
                <FaPlusCircle className="upload-img-icon" />
                Thêm ảnh
              </>
            ) : (
              <>
                <RiVideoUploadFill className="upload-vid-icon" />
                Thêm video
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
