import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "./context/UserContext";

const Matches = () => {
  const ccontext = useContext(Context);
  const {
    getMyMatches,
    matches,
    loading,
    activeUser,
    deleteMatch,
    successDelete,
  } = ccontext;
  useEffect(() => {
    getMyMatches();
  }, [successDelete]);

  return !activeUser ? (
    <div>
      <Link to="/">
        <b>See Our User Lists</b>
      </Link>
      Select One of Our Users and Play Tinder
    </div>
  ) : (
    <>
      {!loading && matches ? (
        matches.map((match) => (
          <div className="show-matches" key={match._id}>
            <h3 style={{ width: "10px" }}>{match.name}</h3>
            <button
              className="deletebutton"
              onClick={() => deleteMatch(match._id)}
            >
              <strong>X</strong>{" "}
            </button>
            <div className="liked-person-image">
              <img
                src={`/images/users/${match.image}`}
                alt={`You liked ${match.name}`}
              />
            </div>
          </div>
        ))
      ) : (
        <div>You dont Have Match,Go Swipe</div>
      )}
    </>
  );
};

export default Matches;
