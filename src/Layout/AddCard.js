import React, { useState, useEffect } from "react";
import { HomeIcon } from "./Icons";
import { useHistory, useParams } from "react-router-dom";
import { createCard } from "../utils/api";
import { readDeck } from "../utils/api";

/*
The Add Card screen has the following features:

-The path to this screen should include the deckId (i.e., /decks/:deckId/cards/new).
-You must use the readDeck() function from src/utils/api/index.js to load the deck that you're adding the card to.
-There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck to which the cards are being added, and finally the text Add Card (e.g., Home/React Router/Add Card).
-The screen displays the "React Router: Add Card" deck title.
-A form is shown with the "front" and "back" fields for a new card. Both fields use a <textarea> tag that can accommodate multiple lines of text.
-If the user clicks "Save", a new card is created and associated with the relevant deck. Then the form is cleared and the process for adding a card is restarted.
-If the user clicks "Done", the user is taken to the Deck screen.
*/

export const AddCard = function () {
  const { deckId } = useParams();
  const history = useHistory();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    getDeck();
  }, []);

  if (!deck.name) return null;

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
          href="/decks/:deckId/cards/new"
        >
          Add Card
        </a>
      </nav>
    );
  }

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

    async function newCard() {
      const response = await createCard(deckId, card);
      console.log("response: ", response);
    }
    newCard();
    history.push(`/decks/${deckId}`);
    history.go(0);
  }

  return (
    <div className="row">
      <Navbar />
      <div className="row">
        <h1>{`${deck.name}: Add Card`}</h1>
        <div className="col-12">
          <form className="create-form" onSubmit={handleSubmit}>
            {/* Name Inputs */}
            <div className="form-group">
              <label htmlFor="newCardFront">Front</label>
              <textarea
                type="text"
                className="form-control"
                id="newCardFront"
                placeholder="Card Front"
                onChange={handleFrontInput}
                defaultValue={front}
                required
              ></textarea>
            </div>
            {/* Description Inputs */}
            <div className="form-group">
              <label htmlFor="newCardBack">Back</label>
              <textarea
                className="cardBack"
                id="newCardBack"
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

export default AddCard;
