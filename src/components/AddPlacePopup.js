import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import FormInput from "./FormInput.js";

function AddPlacePopup(props) {
  const title = React.useRef("");
  const url = React.useRef("");

  React.useEffect(() => {
    title.current.value = "";
    url.current.value = "";
  }, [props.isOpen]);

  function handleSubmit() {
    props.onAddCard({
      name: title.current.value,
      link: url.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      name="add"
      title="New place"
    >
      <FormInput
        type="text"
        name="title"
        placeholder="Title"
        minLength="2"
        maxLength="30"
        propsRef={title}
      />
      <FormInput
        type="url"
        name="url"
        placeholder="Image link"
        propsRef={url}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
