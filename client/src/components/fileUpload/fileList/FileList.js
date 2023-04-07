import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import { FaRegTrashAlt } from "react-icons/fa";

import "./fileList.scss";

const FileList = ({ type, files, removeFile }) => {
  useEffect(() => {
    return () => {
      files && files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <>
      {files &&
        files.map((file) => 
          {
            return file.type.includes("image/") && type === "image" ? (
              <Col>
                <div className="file-item shadow">
                  <img src={file.preview} alt="preview" className="preview" />
                  <div
                    className="file-delete"
                    onClick={() => removeFile(file.name)}
                  >
                    <FaRegTrashAlt className="delete-icon" />
                    <span className="delete-text">Xóa</span>
                  </div>
                </div>
              </Col>
            ) : file.type.includes("video/") && type === "video" ? (
              <Col>
                <div className="file-item shadow">
                  <video src={file.preview} controls className="preview" />
                  <div
                    className="file-delete"
                    onClick={() => removeFile(file.name)}
                  >
                    <FaRegTrashAlt className="delete-icon" />
                    <span className="delete-text">Xóa</span>
                  </div>
                </div>
              </Col>
            ) : (
              ""
            )
          }
        )}
    </>
  );
};

export default FileList;
