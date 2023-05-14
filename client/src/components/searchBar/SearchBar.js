import React, { useEffect, useState, useContext } from "react";
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

import useAddressContext from "../../hooks/useAddressContext";
import { PostContext } from "../../contexts/PostContext";
import { useLocation, useNavigate } from "react-router-dom";

const minPrice = 0;
const maxPrice = 10;
const minAcreage = 0;
const maxAcreage = 50;

const SearchBar = () => {
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showAcreageModal, setShowAcreageModal] = useState(false);
  const [rentType, setRentType] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [minPriceVal, setMinPriceVal] = useState(minPrice);
  const [maxPriceVal, setMaxPriceVal] = useState(maxPrice);
  const [minAcreageVal, setMinAcreageVal] = useState(minAcreage);
  const [maxAcreageVal, setMaxAcreageVal] = useState(maxAcreage);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    data: { district, ward, address },
    displayAddressModal,
    showAddressModal,
    hideAddressModal,
    setData,
    setPage,
  } = useAddressContext();

  const { postState: { page }, changePage, searchPost } = useContext(PostContext);

  const handleTypeClick = () => {
    setShowTypeModal(true);
  };

  useEffect(() => {
    setFullAddress(address);
  }, [address]);

  const handleClickPrice = () => {
    setShowPriceModal(false);
  };

  const handleClickAcreage = () => {
    setShowAcreageModal(false);
  };

  const handleSubmit = async () => {
    const searchForm = {
      typeId: rentType._id,
      district: district,
      ward: ward,
      minPrice: minPriceVal,
      maxPrice: maxPriceVal,
      minAcreage: minAcreageVal,
      maxAcreage: maxAcreageVal,
    };

    try {
      await searchPost(searchForm);
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    changePage(1);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/search") {
      setPage(0);
      setFullAddress("");
      setMinPriceVal(minPrice);
      setMaxPriceVal(maxPrice);
      setMinAcreageVal(minAcreage);
      setMaxAcreageVal(maxAcreage);
      setData({
        district: "000",
        districtName: "",
        ward: "00000",
        wardName: "",
        address: "",
      });
    } else {
      handleSubmit();
    }
  }, [pathname, setData, page]);

  return (
    <div className="search-bar">
      <Row xs={1} md={3} lg={5} className="search-bar-top">
        <Col className="search-bar-item" onClick={handleTypeClick}>
          <BiBuildingHouse className="icon-type" />
          <span className="item-type">{rentType ? rentType.name : ""}</span>
        </Col>
        <Col className="search-bar-item" onClick={showAddressModal}>
          <MdLocationPin className="icon-location" />
          {fullAddress ? (
            <span className="item-address">{fullAddress}</span>
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
            <span className="item-price">{`${minPriceVal} - ${maxPriceVal} triệu`}</span>
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
              {`${minAcreageVal} - ${maxAcreageVal} m`}&sup2;
            </span>
          ) : (
            <span className="area-default">Chọn diện tích</span>
          )}
        </Col>
        <Col
          as="button"
          lg="auto"
          md="auto"
          className="search-btn btn btn-primary"
          onClick={handleSubmit}
        >
          <BiSearch />
          <span>Tìm kiếm</span>
        </Col>
      </Row>
      <TypeModal
        type={rentType}
        setType={setRentType}
        show={showTypeModal}
        onHide={() => setShowTypeModal(false)}
      />
      <AddressModal show={displayAddressModal} onHide={hideAddressModal} />
      <PriceModal
        show={showPriceModal}
        onHide={() => setShowPriceModal(false)}
        minPrice={minPrice}
        maxPrice={maxPrice}
        minPriceVal={minPriceVal}
        maxPriceVal={maxPriceVal}
        setMinPriceVal={setMinPriceVal}
        setMaxPriceVal={setMaxPriceVal}
        handleClickPrice={handleClickPrice}
      />
      <AcreageModal
        show={showAcreageModal}
        onHide={() => setShowAcreageModal(false)}
        minAcreage={minAcreage}
        maxAcreage={maxAcreage}
        minAcreageVal={minAcreageVal}
        maxAcreageVal={maxAcreageVal}
        setMinAcreageVal={setMinAcreageVal}
        setMaxAcreageVal={setMaxAcreageVal}
        handleClickAcreage={handleClickAcreage}
      />
    </div>
  );
};

export default SearchBar;
