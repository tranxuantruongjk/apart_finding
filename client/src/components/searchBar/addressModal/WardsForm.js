import React from "react";
import useSearchContext from "../../../hooks/useSearchContext";

import Form from "react-bootstrap/Form";

const WardsForm = () => {
  const { addressState, handleChangeWard, handleChangeAllWards } =
    useSearchContext();

  const wardsList = require(`hanhchinhvn/dist/xa-phuong/${addressState.district}.json`);
  const wards = Object.values(wardsList);

  const handleChange = () => {
  }

  return (
    <Form>
      <Form.Check type="radio" className={`border-bottom`}>
        <Form.Check.Input
          type="radio"
          name="ward"
          id="00000"
          checked={addressState.ward === "00000"}
          onChange={handleChangeAllWards}
        />
        <Form.Check.Label
          as="button"
          className={
            addressState.ward === "00000" ? "type-actived btn btn-link" : "btn btn-link"
          }
          htmlFor="00000"
        >
          Tất cả
        </Form.Check.Label>
      </Form.Check>
      {wards.map((ward) => (
        <Form.Check
          key={ward.code}
          type="radio"
          className={`border-bottom`}
        >
          <Form.Check.Input
            type="radio"
            name="ward"
            id={`${ward.code}`}
            checked={addressState.ward === ward.code}
            onClick={handleChangeWard}
            onChange={handleChange}
          />
          <Form.Check.Label
            as="button"
            className={
              addressState.ward === ward.code
                ? "type-actived btn btn-link"
                : "btn btn-link"
            }
            htmlFor={`${ward.code}`}
          >
            {`${ward.name_with_type}`}
          </Form.Check.Label>
        </Form.Check>
      ))}
    </Form>
  );
};

export default WardsForm;
