import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

import districtsList from "hanhchinhvn/dist/quan-huyen/01.json";
import { compare } from "../../utils/compare";

import useSearchContext from "../../hooks/useSearchContext";

import "./districtsList.scss";

const DistrictsList = () => {
  const districts = Object.values(districtsList).sort(compare("code"));
  const { setAddressState } = useSearchContext();

  const handleClickDistrict = (e, district) => {
    setAddressState((state) => ({
      ...state,
      district: district.code,
      districtName: district.name_with_type,
      address: district.name_with_type,
    }));
  };

  return (
    <div className="districts-list">
      <Card>
        <Card.Body>
          <Card.Title>Xem theo quận</Card.Title>
          <ListGroup variant="flush">
            {districts.map((district) => (
              <ListGroup.Item key={district.code}>
                <div className="list-item">
                  <IoIosArrowForward className="list-item__icon" />
                  <Link
                    to="/posts/search"
                    className="list-item__text"
                    onClick={(e) => handleClickDistrict(e, district)}
                  >
                    {district.name_with_type}
                  </Link>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DistrictsList;
