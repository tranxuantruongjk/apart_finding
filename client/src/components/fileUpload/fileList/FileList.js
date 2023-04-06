import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import { FaRegTrashAlt } from "react-icons/fa";

import "./fileList.scss";

const FileList = ({ files, removeFile }) => {
  useEffect(() => {
    return () => {
      files && files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <>
      {files &&
        files.map((file) => (
          <Col>
            <div className="file-item shadow">
              <img src={file.preview} className="pre-image" />
              <div className="file-delete" onClick={() => removeFile(file.name)}>
                <FaRegTrashAlt className="delete-icon"/>
                <span className="delete-text">Xóa</span>
              </div>
            </div>
          </Col>
        ))}
    </>
  );
};

export default FileList;
