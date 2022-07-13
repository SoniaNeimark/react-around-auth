import PopupWithForm from "../basic/popup/PopupWithForm";

function AlertPopup(props) {

  return (
    <PopupWithForm
      name="alert"
      title="Are you sure?"
      onSubmit={() => props.handleCardDelete(props.selectedCard)}
    />
  );
}

export default AlertPopup;
