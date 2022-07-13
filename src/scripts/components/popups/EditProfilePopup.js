import { useContext, useState, useEffect } from "react";
import PopupWithForm from "../basic/popup/PopupWithForm";
import FormInput from "../basic/input/FormInput";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentPropsContext } from "../../contexts/CurrentPropsContext"

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const currentProps = useContext(CurrentPropsContext)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, currentProps.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit() {
    props.onUpdateUser({ name: name, about: description });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="profile"
      title="Edit profile"
    >
      <FormInput
        value={name}
        onChange={handleNameChange}
        type="text"
        name="name"
        placeholder="Name"
        minLength="2"
        maxLength="40"
      />
      <FormInput
        value={description}
        onChange={handleAboutChange}
        type="text"
        name="about"
        placeholder="About me"
        minLength="2"
        maxLength="200"
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
