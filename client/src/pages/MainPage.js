import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import "./mainPage.scss";

const MainPage = () => {
  return (
    <main className="main-page">
      <Header />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default MainPage;
