import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = props.likes.some((user) => checkIfOwner(user));
  const isOwn = checkIfOwner(props.owner);

  function checkIfOwner(owner) {
    return owner._id === currentUser._id;
  }

  function handleImageClick(evt) {
    props.onClick(evt);
  }

  function handleCardDelete() {
    props.onCardDelete();
  }

  return (
    <li className="elements__card">
      <div className="elements__image-wrapper">
        <img
          className="elements__image hover-opacity open-popup"
          onClick={handleImageClick}
          src={props.src}
          alt={props.title}
        />
      </div>
      <h2 className="elements__title">{props.title}</h2>
      <div className="elements__like-group">
        <button
          className={`like-button${
            isLiked ? " like-button_status_active" : ""
          }`}
          type="button"
          onClick={props.onCardLike}
        ></button>
        <p className="elements__like-number">{props.likes.length}</p>
      </div>
      <button
        className={`delete-button hover-opacity${
          isOwn ? " delete-button_visible" : ""
        }`}
        type="button"
        onClick={(evt) => {
          handleCardDelete(evt);
        }}
      ></button>
    </li>
  );
}

export default Card;
