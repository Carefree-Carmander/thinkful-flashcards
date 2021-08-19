import React, { useState, useEffect } from "react";
import { updateDeck } from "../utils/api";
import { useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

/* 
The Edit Deck screen has the following features:

-The path to this screen should include the deckId(i.e., /decks/:deckId/edit).
-You must use the readDeck() function from src/utils/api/index.js to load the existing deck.
-There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck being edited, and finally the text Edit Deck (e.g., Home/Rendering in React/Edit Deck).
-It displays the same form as the Create Deck screen, except it is pre-filled with information for the existing deck.
-The user can edit and update the form.
-If the user clicks "Cancel", the user is taken to the Deck screen.
*/

export const EditDeck = function () {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deck, setDeck] = useState({});
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
      setName(response.name);
      setDescription(response.description);
    }
    getDeck();
  }, []);

  if (!deck.id) return null;

  function Navbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand text-primary" href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-house-fill mb-1 mr-1"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
            />
            <path
              fillRule="evenodd"
              d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
            />
          </svg>
          Home
        </a>
        /
        <h5
          className="navbar-brand text-primary"
          style={{
            marginLeft: "15px",
            padding: "0px",
            marginTop: "0px",
            marginBottom: "0px",
          }}
          href={`/decks/${deckId}`}
        >
          {deck.name}
        </h5>
        /
        <a
          className="navbar-brand text-secondary"
          style={{ marginLeft: "15px" }}
          href={`/decks/${deckId}/edit`}
        >
          Edit Deck
        </a>
      </nav>
    );
  }

  const handleNameInput = (evt) => {
    evt.preventDefault();
    setName(evt.target.value);
  };

  const handleDescriptionInput = (evt) => {
    evt.preventDefault();
    setDescription(evt.target.value);
  };

  const handleCancel = (evt) => {
    evt.preventDefault(); // makes it so that the page doesn't refresh

    history.goBack();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault(); // makes it so that the page doesn't refresh

    console.log("name: ", name);
    console.log("description: ", description);

    async function editedDeck() {
      const response = await updateDeck({ name, description });
      console.log("response: ", response);
    }
    editedDeck();
    history.push(`/decks/${deckId}`);
    history.go(0);
  };

  return (
    <div className="row">
      <Navbar />
      <div className="row">
        <div className="row">
          <h1>Edit Deck</h1>
          <div className="col-12">
            <form className="create-form" onSubmit={handleSubmit}>
              {/* Name Inputs */}
              <div className="form-group">
                <label htmlFor="newDeckName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="newDeckName"
                  placeholder={name}
                  onChange={handleNameInput}
                  defaultValue={name}
                  required
                />
              </div>
              {/* Description Inputs */}
              <div className="form-group">
                <label htmlFor="newDeckDescription">Description</label>
                <textarea
                  className="deckDescription"
                  id="newDeckDescription"
                  // placeholder={`${deck.description}`}
                  rows="3"
                  style={{ display: "block", width: "100%" }}
                  placeholder={description}
                  defaultValue={description}
                  required
                  onChange={handleDescriptionInput}
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
    </div>
  );
};

export default EditDeck;
