import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import PopupBox from "../basic/popup/PopupBox";
import { CurrentPropsContext } from "../../contexts/CurrentPropsContext";

function InfoTooltip(props) {
  const currentProps = useContext(CurrentPropsContext);

  return (
    <PopupBox
      loginAlert={true}
      name={"success"}
      handleClick={currentProps.handleCloseInfoTooltip}
    >
      <div className="alert">
        <div
          className={`alert__image${
            currentProps.success ? "" : " alert__image_fail"
          }`}
          onClick={currentProps.handleCloseInfoTooltip}
        ></div>
        <p className="alert__text">
          {currentProps.success
            ? "Success! You have now been registered."
            : "Oops, something went wrong! Please try again."}
        </p>
      </div>
    </PopupBox>
  );
}

export default withRouter(InfoTooltip);
