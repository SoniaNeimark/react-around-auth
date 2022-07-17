import React, { useContext } from "react";
import { CurrentPropsContext } from "../../contexts/CurrentPropsContext";
import PopupBox from "../basic/popup/PopupBox";

function ImagePopup() {
  const currentProps = useContext(CurrentPropsContext);

  return (
    <PopupBox name="image">
      <img
        className="popup-box__image"
        src={currentProps.selectedCard ? currentProps.selectedCard.link : ""}
        alt={currentProps.selectedCard ? currentProps.selectedCard.name : ""}
      />
      <p className="popup-box__subtitle">
        {currentProps.selectedCard ? currentProps.selectedCard.name : ""}
      </p>
    </PopupBox>
  );
}

export default ImagePopup;
