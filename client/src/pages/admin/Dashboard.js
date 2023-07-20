import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../../contexts/AuthContext";

import Sidebar from "../../components/admin/sidebar/Sidebar";
import Header from "../../components/admin/header/Header";
import { Container } from "reactstrap";
import "./dashboard.scss";

const Dashboard = () => {
  const {
    authState: { authLoading, isAuthenticated, user },
  } = useContext(AuthContext);

  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );

  return isAuthenticated && user.role === 1 ? (
    <main className="admin-dashboard">
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/********Content Area**********/}
        <div className="contentArea">
          {/********header**********/}
          <Header />
          {/********Middle Content**********/}
          <Container className="p-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  ) : (
    <Navigate to="/" />
  );
};

export default Dashboard;
