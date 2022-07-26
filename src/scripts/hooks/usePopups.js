import { useState, useCallback } from "react";

export function usePopups(currentUser, enableFormAndValidation) {
  const [popup, setPopup] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const openPopup = (e) => setPopup(e.target["name"]);

  const closePopup = () => setPopup("");

  const handleOpen = (e) => {
    setPopup(e.currentTarget["name"]);
    enableFormAndValidation.setValues({
      name: currentUser["name"],
      about: currentUser["about"],
    });
  };

  const closeAllPopups = useCallback(
    (newSelectedCard = {}) => {
      closePopup();
      setSelectedCard(newSelectedCard);
      enableFormAndValidation.resetForm();
    },
    [setPopup, setSelectedCard]
  );

  const onClickOutside = (e) =>
    e.currentTarget === e.target && closeAllPopups();

  return {
    popup,
    setPopup,
    handleOpen,
    closeAllPopups,
    onClickOutside,
    selectedCard,
    setSelectedCard,
    openPopup,
    closePopup,
  };
}
