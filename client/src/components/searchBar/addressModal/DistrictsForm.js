import React from "react";
import Form from "react-bootstrap/Form";

import districtsList from "hanhchinhvn/dist/quan-huyen/01.json";
import { compare } from "../../../utils/compare";

import useAddressContext from "../../../hooks/useAddressContext";

import "./addressModal.scss";

const DistrictsForm = () => {
  const districts = Object.values(districtsList).sort(compare("code"));

  const {data, handleChangeDistrict, handleChangeAllDistricts} = useAddressContext();

  const handleChange = () => {
  }

  return (
    <Form>
      <Form.Check
        type="radio"
        className={`border-bottom`}
      >
        <Form.Check.Input
          type="radio"
          name="district"
          id="000"
          checked={data.district === "000"}
          onChange={handleChangeAllDistricts}
        />
        <Form.Check.Label
          as="button"
          className={data.district === "000" ? "type-actived btn btn-link" : "btn btn-link" }
          htmlFor="000"
        >
          Tất cả
        </Form.Check.Label>
      </Form.Check>
      {districts.map((district) => (
        <Form.Check
          key={district.code}
          type="radio"
          className={`border-bottom`}
        >
          <Form.Check.Input
            type="radio"
            name="district"
            id={`${district.code}`}
            checked={data.district === district.code}
            onClick={handleChangeDistrict}
            onChange={handleChange}
          />
          <Form.Check.Label
            as="button"
            className={data.district === district.code ? "type-actived btn btn-link" : "btn btn-link" }
            htmlFor={`${district.code}`}
          >
            {`${district.name_with_type}`}
          </Form.Check.Label>
        </Form.Check>
      ))}
    </Form>
  );
};

export default DistrictsForm;
