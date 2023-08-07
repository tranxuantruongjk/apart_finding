import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import user1 from "../../../assets/users/user4.jpg";

import { BsThreeDotsVertical, BsList, BsX } from "react-icons/bs";
import { GrNotification } from "react-icons/gr";

import "./header.scss";

import { AuthContext } from "../../../contexts/AuthContext";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import vi from "timeago.js/lib/lang/vi";

const Header = () => {
  timeago.register("vi", vi);
  const {
    authState: { user },
    logoutUser,
    getAdminNotifications,
    socket,
    notifications,
    setNotifications,
    updateNotification,
  } = useContext(AuthContext);

  useEffect(() => {
    const getAllNotifications = async () => {
      const response = await getAdminNotifications(user._id);

      setNotifications(response.notifications);
    };

    user && getAllNotifications();
  }, [user]);

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => {
        const arr = [data, ...prev];
        const result = [];
        result.push(arr[0]);
        for (let i = 0; i < arr.length - 1; i++) {
          if (arr[i]._id !== arr[i + 1]._id) {
            result.push(arr[i + 1]);
          }
        }
        return result;
      });
    });
  }, [socket]);

  const handleClickNotification = async (notificationId) => {
    await updateNotification(notificationId);

    const response = await getAdminNotifications(user._id);
    setNotifications(response.notifications);
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const navigate = useNavigate();
  const logout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <Navbar color="white" light expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <Button
          color="primary"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <BsList />
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? <BsX /> : <BsThreeDotsVertical />}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen} className="d-flex justify-content-end">
        <NavDropdown
          title={
            <div className="icon-notification">
              <GrNotification className="notification" />
              {notifications &&
                notifications.filter(
                  (notification) => notification.seen === false
                ).length > 0 && (
                  <div className="counter">
                    {
                      notifications.filter(
                        (notification) => notification.seen === false
                      ).length
                    }
                  </div>
                )}
            </div>
          }
          className="nav-notification"
        >
          {notifications && notifications.length !== 0 ? (
            <>
              {notifications.map((note, index) => (
                <div key={index}>
                  <NavDropdown.Item
                    as={Link}
                    to={`/admin/postsList/${
                      note.postId._id ? note.postId._id : note.postId
                    }`}
                    className={note.seen && "opacity-50"}
                    onClick={() => handleClickNotification(note._id)}
                  >
                    {note.action === "register_post" && (
                      <span>
                        Người dùng{" "}
                        <b>{note.user ? note.user : note.senderId.username}</b>{" "}
                        vừa gửi đăng ký bài viết{" "}
                        <b>{note.title ? note.title : note.postId.title}</b>.
                        Hãy vào xét duyệt đi. (
                        <TimeAgo
                          datetime={note.createdAt}
                          locale="vi"
                          className="time-ago"
                        />
                        )
                      </span>
                    )}
                    {note.action === "update_post" && (
                      <span>
                        Người dùng{" "}
                        <b>{note.user ? note.user : note.senderId.username}</b>{" "}
                        vừa cập nhật lại bài viết{" "}
                        <b>{note.title ? note.title : note.postId.title}</b>.
                        Hãy vào xét duyệt đi. (
                        <TimeAgo
                          datetime={note.createdAt}
                          locale="vi"
                          className="time-ago"
                        />
                        )
                      </span>
                    )}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </div>
              ))}
            </>
          ) : (
            <NavDropdown.Item disabled>
              Bạn không có thông báo nào
            </NavDropdown.Item>
          )}
        </NavDropdown>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>
              {user && user.username}
              <br />
              {user && user.phone}
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={logout}>Đăng xuất</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
