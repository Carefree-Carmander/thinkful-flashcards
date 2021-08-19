import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route, useHistory } from "react-router-dom";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { listDecks, deleteDeck, deleteCard } from "../utils/api";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import Study from "./Study";
import AddCard from "./AddCard";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";

function Layout() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function getDecks() {
      const response = await listDecks();
      setDecks(response);
    }

    getDecks();
  }, []);

  function removeDeck(deckId) {
    async function deckRemoval() {
      const response = await deleteDeck(deckId);
      if (response) {
        console.log("response: ", response);
      }
    }
    if (window.confirm("Are you sure you want to delete this deck?")) {
      deckRemoval();
      history.push("/");
      history.go(0);
    }
  }

    function removeCard(cardId) {
      async function cardRemoval() {
        const response = await deleteCard(cardId);
        if (response) {
          console.log("response: ", response);
        }
      }
      if (window.confirm("Are you sure you want to delete this card?")) {
        cardRemoval();
        history.push("/");
        history.go(0);
      }
    }

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home removeDeck={removeDeck} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId">
            <Deck removeDeck={removeDeck} removeCard={removeCard}/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
