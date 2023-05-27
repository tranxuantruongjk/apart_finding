import React from "react";
import { useLocation } from "react-router-dom";

import SearchBar from "../searchBar/SearchBar";

import "./homeTop.scss";

const HomeTop = () => {
  const { pathname } = useLocation();

  return (
    <div className="homeTop">
      {pathname === "/" ? (
        <div className="slider">
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
      ) : (
        <div className="container search">
          <SearchBar />
        </div>
      )}
    </div>
  );
};

export default HomeTop;
