import React, { useContext } from "react";
import PopupWithForm from "../elements/PopupWithForm";
import InputWithErrorField from "../basic/InputWithErrorField";
import { DocPropsContext } from "../../contexts/DocPropsContext";

const EditAvatarPopup = (props) => {
  const docProps = useContext(DocPropsContext);

  return (
    <PopupWithForm
      name="avatar"
      title="Change profile picture"
      buttonText="Save"
      onSubmit={() => {
        props.handleSubmit(docProps.values["avatar"]);
      }}
    >
      <InputWithErrorField
        name="avatar"
        type="url"
        placeholder="Image link"
      />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
