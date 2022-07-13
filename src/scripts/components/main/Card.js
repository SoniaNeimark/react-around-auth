import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = props.likes.some((user) => checkIfOwner(user));
  const isOwn = checkIfOwner(props.owner);

  function checkIfOwner(owner) {
    return owner._id === currentUser._id;
  }

  return (
    <li className="elements__card">
      <div className="elements__image-wrapper">
        <Link to={props.imageLink}>
        <img
          className="elements__image hover-opacity open-popup"
          onClick={props.onCardClick}
          src={props.src}
          alt={props.title}
        />
        </Link>
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
      <Link to={props.alertLink}>
      <button
        className={`delete-button hover-opacity${
          isOwn ? " delete-button_visible" : ""
        }`}
        type="button"
        onClick={props.onCardDelete}
      ></button>
      </Link>
    </li>
  );
}

export default Card;
