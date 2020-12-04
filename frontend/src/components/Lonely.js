import React, { useEffect, useContext } from "react";
import NewMatch from "./actions/NewMatch";
import { Context } from "./context/UserContext";
import LikedPerson from "./LikedPerson";

const Lonely = () => {
  useEffect(() => {
    getLikedUsers();
  }, []);
  const context = useContext(Context);
  const { matches, activeUser, getLikedUsers, likedUsers, matched } = context;
  const activeUserImage = activeUser.image;
  const array = likedUsers.filter(
    (user) => !matches.find((item) => item._id === user._id)
  );

  return (
    <div id="lonely">
      <h3>Hello {activeUser.name}</h3>
      <p>There's no new around you.</p>
      <span className="pulse">
        <img src={`/images/users/${activeUserImage}`} alt="You..." />
      </span>
      <div id="liked-people">
        <p>
          {likedUsers.length > 0
            ? "People you liked...let's hope they like you too!"
            : ""}
        </p>

        {array.map((item) => (
          <LikedPerson key={item._id} person={item} />
        ))}
      </div>
      {matched && <NewMatch person={matched} />}
    </div>
  );
};

export default Lonely;
