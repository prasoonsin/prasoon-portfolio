import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

function MainLayouts() {
  return (
    <div className="main-layout">

      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Public Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Public Footer */}
      <Footer />

    </div>
  );
}

export default MainLayouts;