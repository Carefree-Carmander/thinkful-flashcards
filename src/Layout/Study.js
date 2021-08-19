import React, { useEffect, useState } from "react";
import { HomeIcon } from "./Icons";
import { useParams, Route, Switch, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import { PlusIcon } from "./Icons";

/*
The Study screen has the following features:

-The path to this screen should include the deckId (i.e., /decks/:deckId/study).
-You must use the readDeck() function from src/utils/api/index.js to load the deck that is being studied.
-There is a breadcrumb navigation bar with links to home /, followed by the name of the deck being studied and finally the text Study (e.g., Home/Rendering In React/Study).
-The deck title (i.e., "Study: Rendering in React" ) is shown on the screen.
-Cards are shown one at a time, front-side first.
-A button at the bottom of each card "flips" it to the other side.
-After flipping the card, the screen shows a next button (see the "Next button" section below) to continue to the next card.
-After the final card in the deck has been shown, a message (see the "Restart prompt" section below) is shown offering the user the opportunity to restart the deck.
-If the user does not restart the deck, they should return to the home screen.
-Studying a deck with two or fewer cards should display a "Not enough cards" message (see the "Not enough cards" section below) and a button to add cards to the deck.
*/

export const Study = function () {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [flip, setFlip] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const history = useHistory();

  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    getDeck();
  }, []);

  // you for sure know that deck exists after this check
  if (!deck.id) return null;

  const cards = deck.cards;
  console.log("cards: ", cards); // cards[1] <-- second card in the array

  // iterate through cards and for each card, display card data

  // if (cards.length) return;

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
          href="/decks/new"
        >
          Study
        </a>
      </nav>
    );
  }

  function WhyNotEnough() {
    if (cards.length < 3) {
      return (
        <div>
          <h1>Not enough cards.</h1>
          <p>There are {cards.length} cards in this deck.</p>
          <Link to={`/decks/${deck.id}/cards/new`}>
            <button type="button" className="btn btn-primary mr-2">
              <PlusIcon />
              Add Cards
            </button>
          </Link>
        </div>
      );
    } else {
      return <ShowCards />;
    }
  }

  // arrays starting indexes at 0
  // array length being an actual number count
  // if an array has a length of 5
  // array[0], array[1], array[2], array[3], array[4] === array.length === 5
  // currentCardIndex = 0
  // when currentCardIndex === 5 then set currentCardIndex to 5 + 1;

  // const handleCurrentIndex = () => {
  //   if (currentCardIndex < cards.length - 1) {
  //     setCurrentCardIndex(currentCardIndex + 1);
  //   }
  // };

  const handleNext = () => {
    if (currentCardIndex === cards.length - 1) {
      const result = window.confirm(
        "Restart cards? \n\nClick 'Cancel' to return to the home page."
      );
      if (result) {
        history.go(0);
      } else {
        history.push("/");
      }
    }
    setCurrentCardIndex((current) => Math.min(cards.length - 1, current + 1));
    setFlip(!flip);
  };

  // const handleFlip = () => {
  //   if (flip) {
  //     cards[currentCardIndex].back;
  //   } else {
  //     cards[currentCardIndex].front;
  //   }
  // };

  function ShowCards() {
    return (
      <div className="row">
        <div className="col-12">
          <h1>Study: {deck.name}</h1>
          <div className="card">
            <div className="card-body">
              {/* <IndexHandleVisualizer /> */}
              <h5>
                Card {currentCardIndex + 1} of {cards.length}
              </h5>
              <p className="card-text">
                {flip
                  ? cards[currentCardIndex].back
                  : cards[currentCardIndex].front}
              </p>
              {/* <p>{cards.front}</p> */}
              <button
                type="button"
                className="btn btn-secondary mr-2"
                onClick={() => {
                  setFlip(!flip);
                }}
              >
                Flip
              </button>
              {flip && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function NotEnough() {
    return (
      <div className="col-12">
        <WhyNotEnough />
      </div>
    );
  }

  return (
    <div className="row">
      <Navbar />

      {cards.length >= 3 ? <ShowCards /> : <NotEnough />}
    </div>
  );
};

export default Study;
