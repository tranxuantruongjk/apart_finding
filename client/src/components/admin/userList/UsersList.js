import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../../contexts/admin/UserContext";
import NewUser from "../newUser/NewUser";
import ActionModal from "../actionModal/ActionModal";
import Paging from "../paging/Paging";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { BsFillPersonPlusFill } from "react-icons/bs";
import { TbLock, TbLockOpen } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";

import "./usersList.scss";
import avatar from "../../../assets/images/default-user.png";

const UsersList = () => {
  const {
    userState: { users, filter, page, limit, total },
    getAllUsers,
    blockUser,
    unblockUser,
    deleteUser,
    changePage,
    changeLimit,
    changeFilter,
  } = useContext(UserContext);

  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [action, setAction] = useState(null);

  const handleClickList = (e) => {
    const btnsList = Object.values(
      document.getElementById("selector").childNodes
    );
    changePage(1);
    changeFilter(e.target.id);
    const remainList = btnsList.filter((btn) => btn !== e.target);
    e.target.classList.add("active");
    for (let btn of remainList) {
      btn.classList.remove("active");
    }
  };

  const handleActionBlock = (userId) => {
    setShowActionModal(true);
    setAction({
      object: userId,
      action: blockUser,
      message: "Bạn chắc chắn muốn khóa tài khoản này?",
      button: "Xác nhận",
    });
  };

  const handleActionUnblock = (userId) => {
    setShowActionModal(true);
    setAction({
      object: userId,
      action: unblockUser,
      message: "Bạn chắc chắn muốn mở khóa tài khoản này?",
      button: "Xác nhận",
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      await getAllUsers();
    };

    getUsers();
  }, [page, limit, filter]);

  const handleActionDelete = (userId) => {
    setShowActionModal(true);
    setAction({
      object: userId,
      action: deleteUser,
      message: "Bạn chắc chắn muốn xóa tài khoản này?",
      button: "Xác nhận",
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Danh sách người dùng</h5>
        <Button
          className="d-flex justify-content-between align-items-center fw-bold"
          onClick={() => setShowNewUserModal(true)}
        >
          <BsFillPersonPlusFill className="me-2" />
          <span>Thêm</span>
        </Button>
      </div>
      <Card>
        <Card.Header id="selector">
          <Button
            id="all"
            variant="link"
            className={
              filter === "all"
                ? "text-decoration-none text-dark fw-bold active"
                : "text-decoration-none text-dark fw-bold"
            }
            onClick={handleClickList}
          >
            All
          </Button>
          <Button
            id="admin"
            variant="link"
            className={
              filter === "admin"
                ? "text-decoration-none text-dark fw-bold active"
                : "text-decoration-none text-dark fw-bold"
            }
            onClick={handleClickList}
          >
            Admin
          </Button>
          <Button
            id="user"
            variant="link"
            className={
              filter === "user"
                ? "text-decoration-none text-dark fw-bold active"
                : "text-decoration-none text-dark fw-bold"
            }
            onClick={handleClickList}
          >
            User
          </Button>
        </Card.Header>
        <Card.Body>
          <Table
            className="no-wrap mt-3 align-middle"
            responsive
            borderless
            hover
          >
            <thead>
              <tr>
                <th>Họ và tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Trạng thái</th>
                <th>Vai trò</th>
                <th className="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((tdata, index) => (
                <tr key={index} className="border-top font-size-sm">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.username}</h6>
                        {/* <span className="text-muted">{tdata.email}</span> */}
                      </div>
                    </div>
                  </td>
                  <td>{tdata.phone}</td>
                  <td>{tdata.email ? tdata.email : ""}</td>
                  <td>
                    {tdata.state === "blocked" ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td>{tdata.role === 0 ? "User" : "Admin"}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-around fs-5">
                      {tdata.state === "active" ? (
                        <TbLockOpen
                          className="btn-action"
                          onClick={() => handleActionBlock(tdata._id)}
                        />
                      ) : (
                        <TbLock
                          className="btn-action"
                          onClick={() => handleActionUnblock(tdata._id)}
                        />
                      )}
                      <MdOutlineDelete
                        className="btn-action"
                        onClick={() => handleActionDelete(tdata._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Paging
        page={page}
        limit={limit}
        totalPosts={total}
        changePage={changePage}
        changeLimit={changeLimit}
      />
      <ActionModal
        showActionModal={showActionModal}
        setShowActionModal={setShowActionModal}
        action={action}
      />
      <NewUser
        showNewUserModal={showNewUserModal}
        setShowNewUserModal={setShowNewUserModal}
      />
    </div>
  );
};

export default UsersList;
