import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AuthContextProvider from "./contexts/AuthContext";
import PostContextProvider from "./contexts/PostContext";
import SearchProvider from "./contexts/SearchContext";
import UserContextProvider from "./contexts/admin/UserContext";
import AdminPostContextProvider from "./contexts/admin/PostContext";

import MainRoutes from "./routes/MainRoutes";

import "./App.scss";

function App() {
  useEffect(() => {
    const activeScrollTop = () => {
      const scrollTop = document.getElementById("scroll-top");
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        scrollTop.classList.add("scroll-top-active");
      } else {
        scrollTop.classList.remove("scroll-top-active");
      }
    };
    window.addEventListener("scroll", activeScrollTop);
    return () => {
      window.removeEventListener("scroll", activeScrollTop);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <AuthContextProvider>
      <PostContextProvider>
        <SearchProvider>
          <UserContextProvider>
            <AdminPostContextProvider>
              <Router>
                <MainRoutes />
                <div id="scroll-top" onClick={handleScrollTop}></div>
              </Router>
            </AdminPostContextProvider>
          </UserContextProvider>
        </SearchProvider>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
