import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import { HomeIcon, TrashIcon, EditIcon, PlusIcon, StudyIcon } from "./Icons";

/* 
The Deck screen has the following features:

-The path to this screen should include the deckId (i.e., /decks/:deckId).
-You must use the readDeck() function from src/utils/api/index.js to load the existing deck.
-There is a breadcrumb navigation bar with a link to home / followed by the name of the deck (e.g., Home/React Router).
-The screen includes the deck name (e.g., "React Router") and deck description (e.g., "React Router is a collection of -navigational components that compose declaratively in your application").
-The screen includes "Edit", "Study", "Add Cards", and "Delete" buttons. Each button takes the user to a different destination, as follows:

| Button Clicked | Destination |
| -------------- | ---------------------------------------------------------------------------------------------- |
| "Edit" | Edit Deck Screen |
| "Study" | Study screen |
| "Add Cards" | Add Card screen |
| "Delete" | Shows a warning message before deleting the deck]( See the "Delete Card Prompt" section below) |

Each card in the deck:

-is listed on the page under the "Cards" heading.
-shows a question and the answer to the question.
-has an “Edit” button that takes the user to the Edit Card screen when clicked.
-has a “Delete” button that allows that card to be deleted.
*/

export const Deck = function ({ removeDeck, removeCard }) {
  // get the deck id from the params (/decks/:deckId)
  const deckId = useParams().deckId;
  const [deck, setDeck] = useState({});
  const { url } = useRouteMatch();
  const addNewCard = url + "/cards/new";

  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    getDeck();
  }, []);

  if (!deck.id) return null;

  function Navbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand text-primary" href="/">
          <HomeIcon />
          Home
        </a>
        /
        <a
          className="navbar-brand text-secondary"
          style={{ marginLeft: "15px" }}
          href={`/decks/${deckId}`}
        >
          {deck.name}
        </a>
      </nav>
    );
  }

  function cardCards(card) {
    return (
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-5">
                <p>{card.front}</p>
              </div>
              <div className="col-5">
                <p>{card.back}</p>
              </div>
              <div className="col-2">
                <div className="float-right">
                  <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                    <button type="button" className="btn btn-secondary mr-1">
                      <EditIcon />
                      Edit
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeCard(card.id)}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function DeckView() {
    return (
      <div className="row">
        <h1>{deck.name}</h1>
        <div className="col-12">
          <p style={{ fontSize: "19px" }}>{deck.description}</p>
        </div>
        <div className="col-12">
          <Link to={`/decks/${deck.id}/edit`}>
            <button type="button" className="btn btn-secondary mr-2">
              <EditIcon />
              Edit
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button type="button" className="btn btn-primary mr-2">
              <StudyIcon />
              Study
            </button>
          </Link>
          <Link to={addNewCard}>
            <button type="button" className="btn btn-primary mr-2">
              <PlusIcon />
              Add Cards
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-danger float-right"
            onClick={() => removeDeck(deck.id)}
          >
            <TrashIcon />
          </button>
        </div>
        <div className="col-12 mt-4">
          <h1>Cards</h1>
          {deck.cards.map((card) => cardCards(card))}
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <Navbar />
      <DeckView />
    </div>
  );
};

export default Deck;
