import PropTypes from "prop-types";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import "./index.css";

export default function CartLayOut({ children, isContent }) {
  return (
    <div className="cart-layout">
      <div className="header-nav-wrapper">
        <Header />
      </div>
      <main className={`page-content ${isContent ? "with-content" : ""}`}>
        {isContent ? (
          <div className="content-wrapper">{children}</div>
        ) : (
          children
        )}
      </main>
      <Footer />
    </div>
  );
}

CartLayOut.propTypes = {
  children: PropTypes.node.isRequired,
  isContent: PropTypes.bool,
};

CartLayOut.defaultProps = {
  isContent: false,
};
