import React, { useContext } from "react";
import PopupBox from "../basic/popup/PopupBox";
import Button from "../basic/button/Button";
import { CurrentPropsContext } from "../../contexts/CurrentPropsContext";

function AlertPopup(props) {
  const currentProps = useContext(CurrentPropsContext);

  return (
    <PopupBox name="alert">
      <h2 className="popup-box__title popup-box__title_centered">
        Are you sure?
      </h2>
      <Button
        type={"button"}
        onClick={() => props.handleCardDelete(currentProps.selectedCard)}
        disabled={false}
        value="Yes"
      ></Button>
    </PopupBox>
  );
}

export default AlertPopup;
