import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentPropsContext } from "../../contexts/CurrentPropsContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const currentProps = React.useContext(CurrentPropsContext);

  function handleClick() {
    currentProps.setIsOpen(true);
  }

  return (
    <main className="main-content">
      <section className="profile">
        <div
          className="profile__image"
          id="profile"
          style={{
            backgroundImage: `url(${currentUser.avatar})`,
          }}
        ></div>
        <div className="profile__avatar-edit">
          <Link to={currentProps.avatar}>
            <button
              className="avatar-edit-button hover-opacity open-popup"
              type="button"
              onClick={handleClick}
            ></button>
          </Link>
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{currentUser.name}</h1>
            <Link to={currentProps.profile}>
              <button
                className="edit-button hover-opacity open-popup"
                type="button"
                onClick={handleClick}
              ></button>
            </Link>
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <div className="profile__add-button-wrapper">
          <Link to={currentProps.create}>
            <button
              className="profile__add-button hover-opacity open-popup"
              type="button"
              onClick={handleClick}
            ></button>
          </Link>
        </div>
      </section>

      <section className="elements">
        <ul className="elements__cards" id="cards">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              id={card._id}
              src={card.link}
              title={card.name}
              likes={card.likes}
              owner={card.owner}
              onCardClick={() => props.handleCardClick(card)}
              onCardLike={() => {
                props.onCardLike(card);
              }}
              onCardDelete={() => {
                props.handleAlertPopupOpen(card);
              }}
              imageLink={`${currentProps.main}/${card._id}`}
              alertLink={currentProps.delete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
