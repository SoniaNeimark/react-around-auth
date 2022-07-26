import React from "react";

const Card = (props) => {
  const newCard = props.newCard;

  return (
    <li id={newCard._id} className="card">
      <img
        name="imagepopup"
        className="card__image hover-opacity"
        onClick={props.handleImageClick}
        src={newCard.link}
        alt={newCard.name}
      />
      <div className="card__title-group">
        <h2 className="card__title">{newCard.name}</h2>
        <div className="card__like-group">
          <button
            className={`card__like-button hover-opacity${
              props.isLiked ? " card__like-button_active" : ""
            }`}
            type="button"
            onClick={props.handleCardLike}
          ></button>
          <p className="card__likes-number">{newCard.likes.length}</p>
        </div>
      </div>
      <button
        name="alertpopup"
        className={`card__delete-button hover-opacity${
          props.isOwn ? " card__delete-button_visible" : ""
        }`}
        type="button"
        onClick={props.handleCardDeleteClick}
      ></button>
    </li>
  );
};

export default Card;

/*{newCard[likes].length}*/
