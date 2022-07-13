import { useContext, useEffect, useRef } from "react";
import { CurrentPropsContext } from "../../contexts/CurrentPropsContext";
import PopupWithForm from "../basic/popup/PopupWithForm";
import FormInput from "../basic/input/FormInput";

function AddPlacePopup(props) {
  const currentProps = useContext(CurrentPropsContext)
  const title = useRef("");
  const url = useRef("");

  useEffect(() => {
    title.current.value = "";
    url.current.value = "";
  }, [currentProps.isOpen]);

  return (
    <PopupWithForm
      onSubmit={() => props.handleAddPlaceSubmit({
        name: title.current.value,
        link: url.current.value,
      })}
      buttonText="Create"
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
