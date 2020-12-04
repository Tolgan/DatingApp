import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/UserContext";

const NewMatch = ({ person }) => {
  const context = useContext(Context);
  const { setMatched, activeUser } = context;

  return (
    <div class="modal">
      <h1>It's a Match!</h1>
      <p>You and {person.name} liked each other</p>
      <div class="imageholder">
        <img src={`/images/users/${person.image}`} alt="liked person" />
        <img src={`/images/users/${activeUser.image}`} alt="You" />
      </div>
      <Link to="/matches">
        <button className="newmatch" onClick={() => setMatched(null)}>
          <h3>Send Message</h3>
        </button>
      </Link>
      <button className="newmatch" onClick={() => setMatched(null)}>
        <h3> Keep Swiping</h3>
      </button>
    </div>
  );
};

export default NewMatch;
