import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Card = (props) => {
  const newCard = props.newCard;
  const currentUser = useContext(CurrentUserContext);
  const isLiked = newCard.likes.some((user) => checkIfOwner(user));
  const isOwn = checkIfOwner(newCard.owner);

  function checkIfOwner(owner) {
    return owner._id === currentUser._id;
  }

  function handleImageClick(evt) {
    props.handleImageClick(evt);
  }

  return (
    <li id={newCard._id} className="card">
      <img
        name="imagepopup"
        className="card__image hover-opacity"
        onClick={handleImageClick}
        src={newCard.link}
        alt={newCard.name}
      />
      <div className="card__title-group">
        <h2 className="card__title">{newCard.name}</h2>
        <div className="card__like-group">
          <button
            className={`card__like-button hover-opacity${
              isLiked ? " card__like-button_active" : ""
            }`}
            type="button"
            onClick={() => props.handleCardLike(newCard, isLiked)}
          ></button>
          <p className="card__likes-number">{newCard.likes.length}</p>
        </div>
      </div>
      <button
        name="alertpopup"
        className={`card__delete-button hover-opacity${
          isOwn ? " card__delete-button_visible" : ""
        }`}
        type="button"
        onClick={props.handleCardDeleteClick}
      ></button>
    </li>
  );
};

export default Card;
