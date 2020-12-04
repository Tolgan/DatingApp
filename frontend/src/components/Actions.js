import React from "react";
import Dislike from "./actions/Dislike";
import Like from "./actions/Like";

const Actions = ({ person, likeUser, dislikeUser }) => (
  <div id="actions">
   
    <Dislike userId={person}  dislikeUser={dislikeUser}/>
    <Like userId={person}  likeUser={likeUser}/>
  </div>
);

export default Actions;
