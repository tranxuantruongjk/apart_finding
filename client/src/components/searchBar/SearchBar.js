import React, { useEffect, useState } from "react";
import "./searchBar.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BiSearch } from "react-icons/bi";
import { BiBuildingHouse } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";
import { IoPricetagOutline } from "react-icons/io5";
import { BiArea } from "react-icons/bi";

import TypeModal from "./typeModal/TypeModal";
import AddressModal from "./addressModal/AddressModal";
import PriceModal from "./priceModal/PriceModal";
import AcreageModal from "./acreageModal/AcreageModal";

import useSearchContext from "../../hooks/useSearchContext";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showAcreageModal, setShowAcreageModal] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    minPrice,
    maxPrice,
    minAcreage,
    maxAcreage,
    addressState: { district, ward, address },
    searchState: {
      rentType,
      minPriceVal,
      maxPriceVal,
      minAcreageVal,
      maxAcreageVal,
      utils,
      gender,
    },
    changePage,
    searchPost,
    setSearchState,
    displayAddressModal,
    showAddressModal,
    hideAddressModal,
    setAddressState,
    setAddressPage,
  } = useSearchContext();

  const handleSubmit = async () => {
    const searchForm = {
      typeId: rentType._id,
      district: district,
      ward: ward,
      minPrice: minPriceVal,
      maxPrice: maxPriceVal,
      minAcreage: minAcreageVal,
      maxAcreage: maxAcreageVal,
      utils,
      gender,
    };

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    try {
      await searchPost(searchForm, 1);
      changePage(1);
      navigate("/posts/search");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (pathname !== "/posts/search") {
      setAddressPage(0);
      setSearchState({
        rentType: {},
        minPriceVal: minPrice,
        maxPriceVal: maxPrice,
        minAcreageVal: minAcreage,
        maxAcreageVal: maxAcreage,
        utils: [],
        gender: "any",
      });
      setAddressState({
        district: "000",
        districtName: "",
        ward: "00000",
        wardName: "",
        address: "",
      });
    }
  }, [pathname]);

  return (
    <div className="search-bar">
      <Row xs={1} md={3} lg={5} className="search-bar-top">
        <Col className="search-bar-item" onClick={() => setShowTypeModal(true)}>
          <BiBuildingHouse className="icon-type" />
          {rentType.name ? (
            <span className="item-type">{rentType.name}</span>
          ) : (
            <span className="type-default">Loại tin</span>
          )}
        </Col>
        <Col className="search-bar-item" onClick={showAddressModal}>
          <MdLocationPin className="icon-location" />
          {address ? (
            <span className="item-address">{address}</span>
          ) : (
            <span className="address-default">Hà Nội</span>
          )}
        </Col>
        <Col
          className="search-bar-item"
          onClick={() => setShowPriceModal(true)}
        >
          <IoPricetagOutline className="icon-price" />
          {minPriceVal !== minPrice || maxPriceVal !== maxPrice ? (
            <span className="item-price">
              {minPriceVal === maxPriceVal && maxPriceVal === maxPrice
                ? `Trên ${maxPriceVal} triệu`
                : `${minPriceVal} - ${maxPriceVal} triệu`}
            </span>
          ) : (
            <span className="price-default">Chọn giá</span>
          )}
        </Col>
        <Col
          className="search-bar-item"
          onClick={() => setShowAcreageModal(true)}
        >
          <BiArea className="icon-area" />
          {minAcreageVal !== minAcreage || maxAcreageVal !== maxAcreage ? (
            <span className="item-area">
              {minAcreageVal === maxAcreageVal && maxAcreageVal === maxAcreage ?
              `Trên ${maxAcreageVal} m`
              : `${minAcreageVal} - ${maxAcreageVal} m`}&sup2;
            </span>
          ) : (
            <span className="area-default">Chọn diện tích</span>
          )}
        </Col>
        <Col
          as="button"
          lg="auto"
          md="auto"
          className="search-btn btn"
          onClick={handleSubmit}
        >
          <BiSearch />
          <span>Tìm kiếm</span>
        </Col>
      </Row>
      <TypeModal show={showTypeModal} setShowTypeModal={setShowTypeModal} />
      <AddressModal show={displayAddressModal} onHide={hideAddressModal} />
      <PriceModal show={showPriceModal} setShowPriceModal={setShowPriceModal} />
      <AcreageModal
        show={showAcreageModal}
        setShowAcreageModal={setShowAcreageModal}
      />
    </div>
  );
};

export default SearchBar;
