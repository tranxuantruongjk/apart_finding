import { useContext, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { PostContext } from "../../contexts/PostContext";
import useSearchContext from "../../hooks/useSearchContext";

import { utilities } from "../../utils/post";

import "./utils.scss";

const Utils = () => {
  const { searchPost } = useContext(PostContext);
  const {
    addressState: { district, ward },
    searchState: {
      rentType,
      minPriceVal,
      maxPriceVal,
      minAcreageVal,
      maxAcreageVal,
      utils,
      gender,
    },
    changeSearchState,
  } = useSearchContext();

  const handleClickUtil = (e) => {
    if (!e.target.checked) {
      const newUtils = utils.filter((util) => util !== e.target.id);
      changeSearchState("utils", newUtils);
    } else {
      if (!utils) {
        changeSearchState("utils", [`${e.target.id}`]);
      } else {
        changeSearchState("utils", [...utils, e.target.id]);
      }
    }
  };

  const handleClickGender = (e) => {
    if (e.target.checked) {
      changeSearchState("gender", e.target.id);
    }
  };

  const handleFilterPost = async (e) => {
    e.preventDefault();

    try {
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
      await searchPost(searchForm);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (utils && utils.length !== 0) {
      const utilEls = document.querySelectorAll(".util-item.form-check");

      for (const utilEl of utilEls) {
        if (utils.includes(utilEl.childNodes[0].id)) {
          utilEl.childNodes[0].checked = true;
        }
      }
    }
  }, [utils]);

  useEffect(() => {
    const genEls = document.querySelectorAll(".gender-item.form-check");

    for (const genEl of genEls) {
      if (genEl.childNodes[0].id === gender) {
        genEl.childNodes[0].checked = true;
      }
    }
  }, [gender]);

  return (
    <div className="more-filter">
      <Card>
        <Card.Header>
          <h5>Bộ lọc thêm</h5>
          <Button variant="outline-primary" onClick={handleFilterPost}>
            Áp dụng
          </Button>
        </Card.Header>
        <Card.Body>
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="item-header">
                Tiện ích
              </Accordion.Header>
              <Accordion.Body className="items">
                {utilities.map((util) => (
                  <Form.Check
                    type="checkbox"
                    key={util.id}
                    id={util.id}
                    label={util.title}
                    className="util-item"
                    onClick={handleClickUtil}
                  />
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className="item-header">
                Đối tượng
              </Accordion.Header>
              <Accordion.Body className="items">
                <Form.Check
                  type="radio"
                  name="gender"
                  id="any"
                  label="Tất cả"
                  className="gender-item"
                  onClick={handleClickGender}
                />
                <Form.Check
                  type="radio"
                  name="gender"
                  id="male"
                  label="Nam"
                  className="gender-item"
                  onClick={handleClickGender}
                />
                <Form.Check
                  type="radio"
                  name="gender"
                  id="female"
                  label="Nữ"
                  className="gender-item"
                  onClick={handleClickGender}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
        <Card.Footer className="utils-footer" onClick={handleFilterPost}>
          <h5 className="btn-add">Áp dụng</h5>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Utils;
