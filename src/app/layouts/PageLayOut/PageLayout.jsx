import PropTypes from "prop-types";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./index.css";

export default function PageLayOut({ children, isContent }) {
  return (
    <div className="page-layout">
      <div className="header-nav-wrapper">
        <Header />
        <NavigationBar />
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

PageLayOut.propTypes = {
  children: PropTypes.node.isRequired,
  isContent: PropTypes.bool,
};

PageLayOut.defaultProps = {
  isContent: false,
};
