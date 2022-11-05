import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { DocPropsContext } from "../../contexts/DocPropsContext";
import Card from "../elements/Card";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddCardPopup from "./AddCardPopup";
import ImagePopup from "./ImagePopup";
import AlertPopup from "./AlertPopup";

const Main = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const docProps = useContext(DocPropsContext);
  /*const handleCardLike = (card) => {
    docProps.setSelectedCard(card);
    props.handleCardLike();
  };*/
  const handleCardClicks = (e, card) => {
    docProps.handleOpen(e);
    docProps.setSelectedCard(card);
  };

  return (
    <main className="main-content">
      <section className="profile">
        <div
          className="profile__image"
          style={{ backgroundImage: `url('${currentUser.avatar}')` }}
        ></div>
        <div className="profile__avatar-edit">
          <button
            type="button"
            name="avatarpopup"
            onClick={docProps.handleOpen}
            className="profile__button-avatar-edit hover-opacity"
          ></button>
        </div>
        <div className="profile__info-group">
          <div className="profile__name-group">
            <h1
              className="profile__title"
              name="signinpopup"
              onClick={docProps.handleOpen}
            >
              {currentUser ? currentUser.name : "Jaque Coustaux"}
            </h1>
            <button
              name="profilepopup"
              onClick={docProps.handleOpen}
              className="profile__button-edit hover-opacity"
            ></button>
          </div>
          <p className="paragraph-text">
            {currentUser ? currentUser.about : "Traveller"}
          </p>
        </div>
        <button
          name="addpopup"
          onClick={docProps.handleOpen}
          className="profile__button-add hover-opacity"
        ></button>
      </section>
      <section className="gallery">
        <ul className="gallery__cards">
          {props.cards.map((card) => {
            return (
              <li key={card._id} id={card._id} className="card">
              <Card
                newCard={card}
                //handleCardLike={() => handleCardLike(card)}
                handleCardDeleteClick={(e) => handleCardClicks(e, card)}
                handleImageClick={(e) => handleCardClicks(e, card)}
              />
              </li>
            );
          })}
        </ul>
      </section>
      <EditAvatarPopup handleSubmit={props.handleSubmit} />
      <EditProfilePopup handleSubmit={props.handleSubmit} />
      <AddCardPopup handleSubmit={props.handleSubmitAdd} buttonText="Create" />
      <AlertPopup onClick={props.handleCardDelete} />
      <ImagePopup selectedCard={docProps.selectedCard} />
    </main>
  );
};

export default Main;
