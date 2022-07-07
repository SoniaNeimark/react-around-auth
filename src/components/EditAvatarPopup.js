import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import FormInput from "./FormInput.js";

function EditAvatarPopup(props) {
  const avatar = React.useRef("");

  React.useEffect(() => {
    avatar.current.value = "";
  }, [props.isOpen]);

  function handleSubmit() {
    props.onUpdateAvatar(avatar.current.value);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      name="avatar"
      title="Change profile picture"
    >
      <FormInput
        type="url"
        name="avatarurl"
        placeholder="Image link"
        propsRef={avatar}
        isOpen={props.isOpen}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
