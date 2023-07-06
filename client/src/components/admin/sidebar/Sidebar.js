import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

import HomeLogo from "../../logo/Logo";

import "./sideBar.scss";

import { BsX } from "react-icons/bs";
import {
  MdDashboard,
  MdPeople,
  MdArticle,
  MdTypeSpecimen,
} from "react-icons/md";

const navigation = [
  {
    title: "Dashboard",
    href: "/admin/starter",
    icon: <MdDashboard />,
  },
  {
    title: "Người dùng",
    href: "/admin/usersList",
    icon: <MdPeople />,
  },
  {
    title: "Bài đăng",
    href: "/admin/postsList",
    icon: <MdArticle />,
  },
  {
    title: "Loại phòng",
    href: "/admin/rentTypesList",
    icon: <MdTypeSpecimen />,
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="bg-dark">
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <BsX />
        </Button>
      </div>
      <div className="d-lg-block logo">
        <Link to="/admin" className="text-decoration-none">
          <HomeLogo />
        </Link>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "d-flex align-items-center active nav-link py-3"
                    : "d-flex align-items-center nav-link py-3"
                }
              >
                {navi.icon}
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          {/* <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            href="https://www.wrappixel.com/templates/adminpro-react-redux-admin/?ref=33"
          >
            Upgrade To Pro
          </Button> */}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
