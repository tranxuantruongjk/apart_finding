import logo from "../../../assets/images/apart_logo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/admin">
      <img src={logo} alt="logo" className="admin-logo"/>
    </Link>
  );
};

export default Logo;
