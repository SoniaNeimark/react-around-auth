import { useContext } from "react";
import { CurrentPropsContext } from "../../contexts/CurrentPropsContext";

function ImagePopup(props) {
  const currentProps = useContext(CurrentPropsContext);

  return (
    <div
      className={`popup-box popup-box_image popup-box_no-form${
        currentProps.isOpen ? " popup-box_opened" : ""
      }`}
      id="image"
      onClick={(evt) => {
        if (evt.currentTarget === evt.target) {
          currentProps.handleClosePopups();
        }
      }}
    >
      <div className="popup-box__wrapper">
        <button
          className="close-button hover-opacity close-button_place_image"
          type="button"
          onClick={() => currentProps.handleClosePopups()}
        ></button>
        <img className="popup-box__image" src={props.src} alt={props.alt} />
        <p className="popup-box__subtitle">{props.alt}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
