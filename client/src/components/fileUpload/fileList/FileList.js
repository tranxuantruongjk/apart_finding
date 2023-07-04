import React, { useEffect } from "react";
import FileItem from "./FileItem";

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
        files.map((file) => {
          return file.type.includes("image/") && type === "image" ? (
            <FileItem type="image" file={file} removeFile={removeFile} />
          ) : file.type.includes("video/") && type === "video" ? (
            <FileItem type="video" file={file} removeFile={removeFile} />
          ) : (
            ""
          );
        })}
    </>
  );
};

export default FileList;
