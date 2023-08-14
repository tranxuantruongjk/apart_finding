// import { useContext, useEffect, useState } from "react";

// import { AdminPostContext } from "../../../contexts/admin/PostContext";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { TbSettingsPlus } from "react-icons/tb";

import { utilities } from "../../../utils/post";
import "./utilititesList.scss";

const UtilitiesList = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Danh sách tiện ích</h5>
        <Button
          className="d-flex justify-content-between align-items-center fw-bold"
          // onClick={() => setShowNewTypeModal(true)}
        >
          <TbSettingsPlus className="me-2" />
          <span>Thêm</span>
        </Button>
      </div>
      <Card>
        <Card.Body>
          <Table
            className="no-wrap mt-3 align-middle"
            responsive
            borderless
            hover
          >
            <thead>
              <tr>
                <th>Loại tiện ích</th>
                <th>Tên</th>
                <th>Icon</th>
                <th className="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {utilities.map((util, index) => (
                <tr key={index} className="border-top font-size-sm">
                  <td>{util.id}</td>
                  <td>{util.title}</td>
                  <td className="util-icon">{util.icon}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-around fs-5">
                      <MdOutlineEdit
                        className="btn-action"
                        // onClick={() => displayUpdateTypeModal(util)}
                      />
                      <MdOutlineDelete
                        className="btn-action"
                        // title="Xóa tin"
                        // onClick={() => handleActionDelete(tdata._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UtilitiesList;
