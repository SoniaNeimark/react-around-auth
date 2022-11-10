import React from "react";
import Popup from "../basic/Popup";

const ImagePopup = (props) => {
  return (
    <Popup name="image">
      <img
        className="popup__image"
        src={props.selectedCard["link"]}
        alt={props.selectedCard["name"]}
      />
      <p className="paragraph-text paragraph-text_place_image">
        {props.selectedCard["name"]}
      </p>
    </Popup>
  );
};

export default ImagePopup;
