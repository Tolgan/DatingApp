import React from "react";

const Dislike = ({ userId, dislikeUser }) => (
  <button
    onClick={() => {
      dislikeUser(userId);
    }}
    type="button"
  >
    <img src="images/misc/dislike.png" alt="Dislike User" />
  </button>
);

export default Dislike;
