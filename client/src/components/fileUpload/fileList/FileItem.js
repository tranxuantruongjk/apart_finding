import Col from "react-bootstrap/Col";
import { FaRegTrashAlt } from "react-icons/fa";

const FileItem = ({ type, file, removeFile }) => {
  return (
    <Col>
      <div className="file-item shadow">
        {type === "image" && (
          <img
            src={file.preview ? file.preview : file}
            alt="preview"
            className="preview"
          />
        )}
        {type === "video" && (
          <video
            src={file.preview ? file.preview : file}
            controls
            className="preview"
          />
        )}
        <div
          className="file-delete"
          onClick={() => removeFile(file.name ? file.name : file)}
        >
          <FaRegTrashAlt className="delete-icon" />
          <span className="delete-text">Xóa</span>
        </div>
      </div>
    </Col>
  );
};

export default FileItem;
