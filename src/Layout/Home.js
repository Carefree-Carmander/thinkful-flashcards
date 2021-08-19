import React, { useEffect, useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { ViewIcon, TrashIcon, PlusIcon, StudyIcon } from "./Icons";
import { listDecks } from "../utils/api";

// import CreateDeck from "./CreateDeck";

export const Home = function ({ removeDeck }) {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function getDecks() {
      const response = await listDecks();
      setDecks(response);
    }
    getDecks();
  }, []);

  if (decks.length === 0) return null;

  function deckInfo(deck) {
    return (
      <div className="col-12" key={deck.id}>
        <div className="card">
          <div className="card-body">
            {/* title and card qty */}
            <div className="row">
              <div className="col-10">
                <h2>{deck.name}</h2>
              </div>
              <div className="col-2">
                <h5 className="float-right text-secondary">
                  {deck.cards.length} cards
                </h5>
              </div>
            </div>
            {/* deck description */}
            <div className="row">
              <div className="col-12">
                <p>{deck.description}</p>
              </div>
            </div>
            {/* view, study, and delete buttons*/}
            <div className="row">
              <div className="col-12">
                <Link to={`/decks/${deck.id}`}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg mr-2"
                  >
                    <ViewIcon />
                    View
                  </button>
                </Link>
                <Link to={`/decks/${deck.id}/study`}>
                  <button type="button" className="btn btn-primary btn-lg">
                    <StudyIcon />
                    Study
                  </button>
                </Link>
                <button
                  type="button"
                  className="btn btn-danger btn-lg float-right"
                  onClick={() => removeDeck(deck.id)}
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-12">
        <Link to="/decks/new">
          <button type="button" className="btn btn-secondary btn-lg mb-2">
            <PlusIcon />
            Create Deck
          </button>
        </Link>
      </div>
      {/* All decks */}
      {decks &&
        decks.map((deck) => {
          return deckInfo(deck);
        })}
    </div>
  );
};


export default Home;
