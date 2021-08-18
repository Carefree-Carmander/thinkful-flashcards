import React, { useEffect, useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { ViewIcon, TrashIcon, PlusIcon, StudyIcon } from "./Icons";
import { listDecks } from "../utils/api";

// import CreateDeck from "./CreateDeck";

/*
The Home screen has the following features:

-The path to this screen should be /.
-A "Create Deck" button is shown and clicking it brings the user to the Create Deck screen.
-Existing decks are each shown with the deck name, the number of cards, and a “Study,” “View,” and “Delete” button.
-Clicking the “Study” button brings the user to the Study screen.
-Clicking the “Edit” button brings the user to the Edit Deck screen.
-Clicking the “Delete” button shows a warning message before deleting the deck.

example deck object:
{
  "name": "React Router",
  "description": "React Router is a collection of navigational components that compose declaratively with your application.",
  "id": 2,
  "cards": [
    {
      "front": "What path will match the follow Route?\n<Route>\n  <NotFound />\n</Route>",
      "back": "All paths. A route with no path matches all URL's",
      "deckId": 2,
      "id": 4
    },
    {
      "front": "What does <Switch> do?",
      "back": "Renders the first matching child <Route> ",
      "deckId": 2,
      "id": 5
    }
  ]
}

*/

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

<Switch>
  <Route>{/* <CreateDeck path="/decks/new"/> */}</Route>
</Switch>;

export default Home;
