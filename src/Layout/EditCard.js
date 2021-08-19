import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { HomeIcon } from "./Icons";
import { updateCard } from "../utils/api";
import { readDeck } from "../utils/api";

/*

The path to this screen should include the deckId and the cardId (i.e., /decks/:deckId/cards/:cardId/edit).
You must use the readDeck() function from src/utils/api/index.js to load the deck that contains the card to be edited. Additionally, you must use the readCard() function from src/utils/api/index.js to load the card that you want to edit.
There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck of which the edited card is a member, and finally the text Edit Card :cardId (e.g., Home/Deck React Router/Edit Card 4).
It displays the same form as the Add Card screen, except it is pre-filled with information for the existing card. It can be edited and updated.
If the user clicks on either "Save" or "Cancel", the user is taken to the Deck screen.

*/

export const EditCard = function () {
  const history = useHistory();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [deck, setDeck] = useState({});
  const { deckId, cardId } = useParams();

  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    getDeck();
  }, [deckId]);

  if (!deck) return null;

  function Navbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand text-primary" href="/">
          <HomeIcon />
          Home
        </a>
        /
        <a
          className="navbar-brand text-primary"
          style={{ marginLeft: "15px" }}
          href={`/decks/${deckId}`}
        >
          {deck.name}
        </a>
        /
        <a
          className="navbar-brand text-secondary"
          style={{ marginLeft: "15px" }}
          href="#"
        >
          {`Edit Card ${cardId}`}
        </a>
      </nav>
    );
  }
  console.log(cardId);

  const handleFrontInput = (evt) => {
    evt.preventDefault();
    setFront(evt.target.value);
  };

  const handleBackInput = (evt) => {
    evt.preventDefault();
    setBack(evt.target.value);
  };

  function handleCancel(evt) {
    evt.preventDefault(); // makes it so that the page doesn't refresh

    history.goBack();
  }

  function handleSubmit(evt) {
    evt.preventDefault(); // makes it so that the page doesn't refresh

    console.log("front: ", front);
    console.log("back: ", back);

    const card = { front, back };

    async function editCard() {
      const response = await updateCard(deckId, card);
      console.log("response: ", response);
    }
    editCard();
    history.push(`/decks/${deckId}`);
    history.go(0);
  }

  const card = { front, back };

  return (
    <div className="row">
      <Navbar />
      <div className="row">
        <h1>Edit Card</h1>
        <div className="col-12">
          <form className="create-form" onSubmit={handleSubmit}>
            {/* Name Inputs */}
            <div className="form-group">
              <label htmlFor="newCardFront">Front</label>
              <input
                type="text"
                className="form-control"
                id="cardFront"
                placeholder="Card Front"
                onChange={handleFrontInput}
                defaultValue={front}
                required
              />
            </div>
            {/* Description Inputs */}
            <div className="form-group">
              <label htmlFor="cardBack">Back</label>
              <textarea
                className="cardBack"
                id="cardBack"
                placeholder="Card Back"
                rows="3"
                style={{ display: "block", width: "100%" }}
                defaultValue={back}
                required
                onChange={handleBackInput}
              ></textarea>
            </div>
            {/* BUTTONS! */}
            <div className="form-group">
              <button
                type="button"
                className="btn btn-secondary btn-lg mr-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCard;
