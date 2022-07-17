import React, { useContext, useEffect, useRef } from "react";
import { CurrentPropsContext } from "../../contexts/CurrentPropsContext";
import PopupWithForm from "../basic/popup/PopupWithForm";
import FormInput from "../basic/input/FormInput";

function EditAvatarPopup(props) {
  const currentProps = useContext(CurrentPropsContext);
  const avatar = useRef("");

  useEffect(() => {
    avatar.current.value = "";
  }, [currentProps.isOpen]);

  function handleSubmit() {
    props.onUpdateAvatar(avatar.current.value);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="avatar"
      title="Change profile picture"
      buttonText="Save"
    >
      <FormInput
        type="url"
        name="avatarurl"
        placeholder="Image link"
        propsRef={avatar}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
