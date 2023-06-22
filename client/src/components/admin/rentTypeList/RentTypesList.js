import { useContext, useEffect, useState } from "react";

import { AdminPostContext } from "../../../contexts/admin/PostContext";
import NewType from "./NewType";
import UpdateType from "./UpdateType";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { BsFillSendPlusFill } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";

const RentTypesList = () => {
  const { rentTypes, getPostsCountByType } = useContext(AdminPostContext);
  const [type, setType] = useState({});

  const [showNewTypeModal, setShowNewTypeModal] = useState(false);
  const [showUpdateTypeModal, setShowUpdateTypeModal] = useState(false);

  const displayUpdateTypeModal = (data) => {
    setShowUpdateTypeModal(true);
    setType(data);
  };

  useEffect(() => {
    const getTypes = async () => {
      await getPostsCountByType();
    }

    getTypes();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Danh sách loại phòng</h5>
        <Button
          className="d-flex justify-content-between align-items-center fw-bold"
          onClick={() => setShowNewTypeModal(true)}
        >
          <BsFillSendPlusFill className="me-2" />
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
                <th>Loại phòng</th>
                <th>Tên</th>
                <th>Số lượng bài đăng</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rentTypes.map((tdata, index) => (
                <tr key={index} className="border-top font-size-sm">
                  <td>{tdata.type}</td>
                  <td>{tdata.name}</td>
                  <td>{tdata.postsCount}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-around fs-5">
                      <MdOutlineEdit
                        className="btn-action"
                        onClick={() => displayUpdateTypeModal(tdata)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <NewType
        showNewTypeModal={showNewTypeModal}
        setShowNewTypeModal={setShowNewTypeModal}
      />
      <UpdateType
        showUpdateTypeModal={showUpdateTypeModal}
        setShowUpdateTypeModal={setShowUpdateTypeModal}
        rentType={type}
      />
    </div>
  );
};

export default RentTypesList;
