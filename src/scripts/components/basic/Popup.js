import React, { useContext } from "react";
import { DocPropsContext } from "../../contexts/DocPropsContext";

const Popup = (props) => {
  const docProps = useContext(DocPropsContext);
  const name = `${props.name}popup`;
  return (
    <div
      onClick={(e) => docProps.onClickOutside(e)}
      name={name}
      className={`popup${name === docProps.popup ? " popup_opened" : ""}`}
    >
      <div
        className={`popup__wrapper${
          props.name === "image" ? " popup__wrapper_image" : ""
        }`}
      >
        <button
          type="button"
          className="close-button close-button_place_popup-top-right hover-opacity"
          onClick={docProps.closeAllPopups}
        ></button>
        {props.children}
      </div>
    </div>
  );
};

export default Popup;
