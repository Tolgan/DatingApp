import React from "react";

const Like = ({ userId, likeUser }) => (
  
  <button
    onClick={() => {
      likeUser(userId);
    }}
    type="button"
  >
    <img src="images/misc/like.png" alt="Like User" />
  </button>
);

export default Like;
