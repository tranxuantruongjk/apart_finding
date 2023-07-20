import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Logo from "../logo/Logo";
import NavbarMenu from "../navbarMenu/NavbarMenu";

import { LuClipboardList } from "react-icons/lu";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import { GrNotification } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";

import "./header.scss";

const Header = () => {
  const {
    authState: { isAuthenticated, user },
    logoutUser,
    getNotifications,
    socket,
    notifications,
    setNotifications,
    updateNotification,
  } = useContext(AuthContext);

  useEffect(() => {
    const getAllNotifications = async () => {
      const response = await getNotifications(user._id);

      setNotifications(response.notifications);
    };

    user && getAllNotifications();
  }, [user]);

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });
  }, [socket]);

  const logout = async () => {
    await logoutUser();
  };

  const handleClickNotification = async (notificationId) => {
    await updateNotification(notificationId);

    const response = await getNotifications(user._id);
    setNotifications(response.notifications);
  };

  return (
    <>
      {user && user.role === 1 ? (
        <></>
      ) : (
        <div className="shadow header">
          <Container className="header__wrap d-flex justify-content-between align-items-center">
            <div className="header__wrap__logo d-flex justify-content-between">
              <Link to={"/"} className="text-decoration-none">
                <Logo />
              </Link>
            </div>
            <NavbarMenu />
            <div className="header__wrap__btn d-flex justify-content-between align-items-center">
              {isAuthenticated && user ? (
                <>
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
                              to="/me/posts"
                              // key={index}
                              className={note.seen && "opacity-50"}
                              onClick={() => handleClickNotification(note._id)}
                            >
                              {note.action === "accept_post" && (
                                <span>
                                  Bài viết{" "}
                                  <b>
                                    {note.title
                                      ? note.title
                                      : note.postId.title}
                                  </b>{" "}
                                  đã được duyệt và đăng lên trang chủ
                                </span>
                              )}
                              {note.action === "reject_post" && (
                                <span>
                                  Bài viết{" "}
                                  <b>
                                    {note.title
                                      ? note.title
                                      : note.postId.title}
                                  </b>{" "}
                                  chưa được đăng do vi phạm quy định đăng tin.
                                  Hãy xem lý do và sửa tin
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
                  <p className="mb-0 me-2 nav-greet">
                    Xin chào,
                    <Link
                      to={"/me/profile"}
                      className="ms-1 text-decoration-none"
                    >
                      {user.username}
                    </Link>
                  </p>
                  <NavDropdown
                    title={<LuLayoutDashboard className="icon-dashboard" />}
                    className="me-4 nav-dashboard"
                  >
                    <NavDropdown.Item className="my-item">
                      <Link to="/me/posts" className="my-posts">
                        <LuClipboardList />
                        <span>Quản lý tin đăng</span>
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item className="my-item">
                      <Link to="/me/savedPosts" className="my-savedPosts">
                        <BsBookmarkHeartFill />
                        <span>Tin đã lưu</span>
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item className="my-item">
                      <Link to="/me/profile" className="my-profile">
                        <BiUserCircle />
                        <span>Thông tin cá nhân</span>
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="my-item">
                      <Link to="/" className="btn__logout" onClick={logout}>
                        <TbLogout />
                        <span>Đăng xuất</span>
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <div className="auth">
                  <Link to="/login" className="me-2 btn__login">
                    Đăng nhập
                  </Link>
                  <span className="auth-split"></span>
                  <Link to="/register" className="ms-2 me-3 btn__signup">
                    Đăng ký
                  </Link>
                </div>
              )}
              <div className="btn__post">
                <Link to="/me/create" className="text-decoration-none">
                  <Button className="d-flex align-items-center">
                    <span>Đăng tin mới</span>
                    <AiOutlinePlusCircle className="ms-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default Header;
