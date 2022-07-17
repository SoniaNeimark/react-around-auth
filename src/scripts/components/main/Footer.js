import React, { useContext } from "react";
import { CurrentPropsContext } from "../../contexts/CurrentPropsContext";

function Footer() {
  const currentProps = useContext(CurrentPropsContext);
  return (
    <footer
      className={`footer ${!currentProps.loggedIn ? "footer_invisible" : ""}`}
    >
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Around The U.S.
      </p>
    </footer>
  );
}

export default Footer;
