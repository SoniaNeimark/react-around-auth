import React, { useContext } from "react";
import PopupWithForm from "../elements/PopupWithForm";
import InputWithErrorField from "../basic/InputWithErrorField";
import { DocPropsContext } from "../../contexts/DocPropsContext";

const EditProfilePopup = (props) => {
  const docProps = useContext(DocPropsContext);

  return (
    <PopupWithForm
      name="profile"
      title="Edit profile"
      buttonText="Save"
      onSubmit={() => {
        props.handleSubmit(docProps.values);
      }}
    >
      <InputWithErrorField
        name="name"
        minLength="2"
        maxLength="30"
        type="text"
        placeholder="Name"
      />
      <InputWithErrorField
        name="about"
        minLength="2"
        maxLength="200"
        type="text"
        placeholder="About me"
      />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
