import React, { useEffect, memo } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import useSearchContext from "../../../hooks/useSearchContext";

import "./acreageModal.scss";

import MultiRangeSlider from "../../multiRangeSlider/MultiRangeSlider";

import { ACREAGE_RANGE } from "../../../contexts/constants";

const AcreageModal = ({ show, setShowAcreageModal }) => {
  const {
    minAcreage,
    maxAcreage,
    searchState: { minAcreageVal, maxAcreageVal },
    changeSearchState,
  } = useSearchContext();

  const handleClick = (e, acreage1, acreage2 = 0) => {
    const btnRangesList = document.getElementsByClassName("acreage-range-item");
    const btnRangesFilter = Object.values(btnRangesList).filter(
      (btnRange) => btnRange !== e.target
    );
    for (let btnRange of btnRangesFilter) {
      btnRange.classList.remove("active");
    }
    e.target.classList.add("active");

    if (acreage2 === 0) {
      if (acreage1 === ACREAGE_RANGE[0]) {
        changeSearchState("minAcreageVal", 0);
        changeSearchState("maxAcreageVal", acreage1);
      } else {
        changeSearchState("minAcreageVal", acreage1);
        changeSearchState("maxAcreageVal", acreage1);
      }
    } else {
      changeSearchState("minAcreageVal", acreage1);
      changeSearchState("maxAcreageVal", acreage2);
    }
  };

  useEffect(() => {
    const btnRangesList = Object.values(
      document.getElementsByClassName("acreage-range-item")
    );
    const btnRangeAll = document.querySelector(".acreage-range-item-all");
    if (btnRangesList.length !== 0) {
      if (minAcreageVal === 0 && maxAcreageVal === ACREAGE_RANGE[0]) {
        btnRangesList[0].classList.add("active");
        const btnRangesFilter = btnRangesList.filter(
          (btnRange) => btnRange !== btnRangesList[0]
        );
        for (let btnRange of btnRangesFilter) {
          btnRangeAll.classList.remove("active");
          btnRange.classList.remove("active");
        }
      } else if (
        minAcreageVal === maxAcreageVal &&
        minAcreageVal === ACREAGE_RANGE[ACREAGE_RANGE.length - 1]
      ) {
        btnRangesList[btnRangesList.length - 1].classList.add("active");
        const btnRangesFilter = btnRangesList.filter(
          (btnRange) => btnRange !== btnRangesList[btnRangesList.length - 1]
        );
        for (let btnRange of btnRangesFilter) {
          btnRangeAll.classList.remove("active");
          btnRange.classList.remove("active");
        }
      } else if (
        ACREAGE_RANGE.includes(minAcreageVal) &&
        ACREAGE_RANGE.includes(maxAcreageVal)
      ) {
        const minIndex = ACREAGE_RANGE.findIndex((e) => e === minAcreageVal);
        const maxIndex = ACREAGE_RANGE.findIndex((e) => e === maxAcreageVal);
        if (minIndex === maxIndex - 1) {
          btnRangesList[minIndex + 1].classList.add("active");
          const btnRangesFilter = btnRangesList.filter(
            (btnRange) => btnRange !== btnRangesList[minIndex + 1]
          );
          for (let btnRange of btnRangesFilter) {
            btnRangeAll.classList.remove("active");
            btnRange.classList.remove("active");
          }
        }
      } else {
        for (let btnRange of btnRangesList) {
          btnRangeAll.classList.remove("active");
          btnRange.classList.remove("active");
        }
      }
      if (minAcreageVal === maxAcreageVal && maxAcreageVal === 0) {
        changeSearchState("minAcreageVal", minAcreage);
        changeSearchState("maxAcreageVal", maxAcreage);
        btnRangeAll.classList.add("active");
      }
      if (
        btnRangeAll &&
        minAcreageVal === minAcreage &&
        maxAcreageVal === maxAcreage
      ) {
        btnRangeAll.classList.add("active");
      }
    }
  }, [show, minAcreageVal, maxAcreageVal]);

  const closeAcreageModal = () => {
    setShowAcreageModal(false);
  };

  return (
    <>
      <Modal show={show} onHide={closeAcreageModal}>
        <Modal.Header closeButton>
          <Modal.Title>Chọn giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="acreage-result">
            {minAcreageVal === maxAcreageVal && maxAcreageVal === 0
              ? "Không hợp lệ"
              : minAcreageVal === maxAcreageVal && maxAcreageVal === maxAcreage
              ? `Trên ${maxAcreageVal} `
              : `${minAcreageVal} - ${maxAcreageVal} `}
            m&sup2;
          </div>
          <MultiRangeSlider
            min={minAcreage}
            max={maxAcreage}
            minVal={minAcreageVal}
            maxVal={maxAcreageVal}
            setMinVal={(value) => changeSearchState("minAcreageVal", value)}
            setMaxVal={(value) => changeSearchState("maxAcreageVal", value)}
          />
          <div className="acreage-range">
            <Row xs={2} md={3}>
              {ACREAGE_RANGE.map((acreage, i) => {
                if (i === 0) {
                  return (
                    <>
                      <Col className="acreage-range-col">
                        <Button
                          variant="light"
                          className="acreage-range-item"
                          onClick={(e) => handleClick(e, acreage)}
                        >
                          Dưới {acreage} m&sup2;
                        </Button>
                      </Col>
                      <Col className="acreage-range-col">
                        <Button
                          variant="light"
                          className="acreage-range-item"
                          onClick={(e) =>
                            handleClick(e, acreage, ACREAGE_RANGE[i + 1])
                          }
                        >
                          Từ {acreage} - {ACREAGE_RANGE[i + 1]} m&sup2;
                        </Button>
                      </Col>
                    </>
                  );
                } else if (i === ACREAGE_RANGE.length - 1) {
                  return (
                    <Col className="acreage-range-col">
                      <Button
                        variant="light"
                        className="acreage-range-item"
                        onClick={(e) => handleClick(e, acreage)}
                      >
                        Trên {acreage} m&sup2;
                      </Button>
                    </Col>
                  );
                } else {
                  return (
                    <Col className="acreage-range-col">
                      <Button
                        variant="light"
                        className="acreage-range-item"
                        onClick={(e) =>
                          handleClick(e, acreage, ACREAGE_RANGE[i + 1])
                        }
                      >
                        Từ {acreage} - {ACREAGE_RANGE[i + 1]} m&sup2;
                      </Button>
                    </Col>
                  );
                }
              })}
              <Col className="acreage-range-col">
                <Button
                  variant="light"
                  className="acreage-range-item-all"
                  onClick={(e) =>
                    handleClick(e, 0, ACREAGE_RANGE[ACREAGE_RANGE.length - 1])
                  }
                >
                  Tất cả
                </Button>
              </Col>
            </Row>
          </div>
          <Button
            variant="primary"
            className="btn-acreage"
            onClick={closeAcreageModal}
          >
            Áp dụng
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default memo(AcreageModal);
