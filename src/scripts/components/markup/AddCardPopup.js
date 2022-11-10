import React, { useContext } from "react";
import PopupWithForm from "../elements/PopupWithForm";
import InputWithErrorField from "../basic/InputWithErrorField";
import { DocPropsContext } from "../../contexts/DocPropsContext";

const AddCardPopup = (props) => {
  const docProps = useContext(DocPropsContext);
  return (
    <PopupWithForm
      name="add"
      title="New place"
      buttonText={props.buttonText}
      onSubmit={() => {
        props.handleSubmit({ name: docProps.values["title"], link: docProps.values["link"] });
      }}
    >
      <InputWithErrorField
        name="title"
        minLength="2"
        maxLength="30"
        type="text"
        placeholder="Title"
      />
      <InputWithErrorField
        name="link"
        type="url"
        placeholder="Image link"
      />
    </PopupWithForm>
  );
};

export default AddCardPopup;
