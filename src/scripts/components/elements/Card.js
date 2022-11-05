import React, { useContext } from "react";
import { DocPropsContext } from "../../contexts/DocPropsContext";

const Card = (props) => {
  const docProps = useContext(DocPropsContext);
  const newCard = props.newCard;
  const likes = newCard.likes;
  const isOwn = docProps.checkIfOwner(newCard.owner);
  const isLiked = () => (likes ? likes.some(docProps.checkIfOwner) : false);

  function handleImageClick(evt) {
    props.handleImageClick(evt);
  }

  return (
    <>
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
              isLiked() ? " card__like-button_active" : ""
            }`}
            type="button"
            onClick={() => docProps.handleCardLike(newCard, isLiked())}
          ></button>
          <p className="card__likes-number">{likes ? likes.length : 0}</p>
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
    </>
  );
};

export default Card;
