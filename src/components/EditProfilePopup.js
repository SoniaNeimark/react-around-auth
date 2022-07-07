import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import FormInput from "./FormInput.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

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
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      name="profile"
      title="Edit profile"
    >
      <FormInput
        value={name}
        setInputValue={setName}
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
