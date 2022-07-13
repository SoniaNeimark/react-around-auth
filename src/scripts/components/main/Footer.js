import React from "react";

function Footer(props) {
  return (
    <footer className={`footer ${!props.loggedIn ? "footer_invisible" : ""}`}>
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Around The U.S.
      </p>
    </footer>
  );
}

export default Footer;
