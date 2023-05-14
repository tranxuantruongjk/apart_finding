import React from "react";

import SearchBar from "../searchBar/SearchBar";

import "./homeTop.scss";

const HomeTop = () => {
  return (
    <div className="homeTop">
      <div className="container">
        <span className="slogan">
          Trang thông tin tìm kiếm
          <br />
          và cho thuê phòng trọ nhanh chóng, hiệu quả, miễn phí
        </span>
        <div className="search">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default HomeTop;
