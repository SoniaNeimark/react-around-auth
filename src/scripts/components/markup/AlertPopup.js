import React from "react";
import Popup from "../basic/Popup";

const AlertPopup = (props) => {
  return (
    <Popup name="alert">
      <div className={`popup__container`}>
        <h2 className="form__title form__title_place_alert">Are you sure?</h2>
        <button className="submit-button submit-button_place_alert submit-button_active" type="button" onClick={props.onClick} disabled={false}>
          Yes
        </button>
      </div>
    </Popup>
  );
};

export default AlertPopup;
