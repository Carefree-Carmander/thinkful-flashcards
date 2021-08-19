import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

/* 
The Create Deck screen has the following features:

-The path to this screen should be /decks/new.
-There is a breadcrumb navigation bar with a link to home / followed by the text Create Deck (i.e., Home/Create Deck).
-A form is shown with the appropriate fields for creating a new deck.
-The name field is an <input> field of type text.
-The description field is a <textarea> field that can be multiple lines of text.
-If the user clicks "submit", the user is taken to the Deck screen.
-If the user clicks "cancel", the user is taken to the Home screen.
*/

export const CreateDeck = function () {
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
        <a
          className="navbar-brand text-secondary"
          style={{ marginLeft: "15px" }}
          href="/decks/new"
        >
          Create Deck
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

  function handleCancel(evt) {
    evt.preventDefault(); // makes it so that the page doesn't refresh

    history.goBack();
  }

  function handleSubmit(evt) {
    evt.preventDefault(); // makes it so that the page doesn't refresh

    console.log("name: ", name);
    console.log("description: ", description);

    async function newDeck() {
      const response = await createDeck({ name, description });
      console.log("response: ", response);
    }
    newDeck();
    history.push("/");
    history.go(0);
  }

  return (
    <div className="row">
      <Navbar />
      <div className="row">
        <h1>Create Deck</h1>
        <div className="col-12">
          <form className="create-form" onSubmit={handleSubmit}>
            {/* Name Inputs */}
            <div className="form-group">
              <label htmlFor="newDeckName">Name</label>
              <input
                type="text"
                className="form-control"
                id="newDeckName"
                placeholder="Deck Name"
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
                placeholder="Deck Description"
                rows="3"
                style={{ display: "block", width: "100%" }}
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
  );
};

export default CreateDeck;
