import React, { useContext } from "react";
import Popup from "../basic/Popup";
import { DocPropsContext } from "../../contexts/DocPropsContext";
const SignInAlertPopup = (props) => {
  const docProps = useContext(DocPropsContext)
  return (
    <Popup name={props.name}>
      <div className="popup__container">
        <button
          className={`alert-button${docProps.success ? " alert-button_success" : ""}`}
          type="button"
          onClick={props.onClick}
          disabled={false}
        ></button>
        <p className="paragraph-text paragraph-text_place_signin-alert">
          {!docProps.success ? "Oops, something went wrong! Please try again." : "Success! You have now been registered."}
        </p>
      </div>
    </Popup>
  );
};
export default SignInAlertPopup;
