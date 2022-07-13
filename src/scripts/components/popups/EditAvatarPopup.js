import React from "react";
import { CurrentPropsContext } from "../../contexts/CurrentPropsContext";
import PopupWithForm from "../basic/popup/PopupWithForm";
import FormInput from "../basic/input/FormInput";

function EditAvatarPopup(props) {
  const currentProps = React.useContext(CurrentPropsContext);
  const avatar = React.useRef("");

  React.useEffect(() => {
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
    >
      <FormInput
        type="url"
        name="avatarurl"
        placeholder="Image link"
        propsRef={avatar}
        onChange={(evt) => console.log(evt.target.value)}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
