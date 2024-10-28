import React, { useState } from "react";
import "mvp.css";
import "./index.css";

function HomePage() {
  const [newItem, setNewItem] = useState("");
  return (
    <>
      <h1>Getting Things Done...</h1>
      <form>
        <input />
        <button>Add</button>
      </form>

      <ol>
        <li>
          <input type="checkbox" />
          To Do Item 1
        </li>
      </ol>
    </>
  );
}

export default HomePage;