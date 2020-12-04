import React, { useState, useEffect } from "react";
import Actions from "./Actions";
import TinderCard from "react-tinder-card";
import NewMatch from "./actions/NewMatch";

export const Person = ({ person, likeUser, dislikeUser, matched }) => {
  const { image, name, age, desc } = person;
  const [lastDirection, setLastDirection] = useState();

  useEffect(() => {
    console.log(matched);
  }, [matched]);

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const swipeHandler = (dir) => {
    swiped(dir, name);
    if (dir === "right") {
      likeUser(person);
    } else if (dir === "left") {
      dislikeUser(person);
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <div className="person">
        <TinderCard
          className="swipe"
          key={person.id}
          onSwipe={(dir) => swipeHandler(dir)}
          preventSwipe={["up", "down"]}
        >
          <div
            className="person-photo"
            style={{ backgroundImage: `url(/images/users/${image})` }}
          >
            <div className="person-description">
              <p className="person-name-age">
                {name}, <span>{age}</span>
              </p>
              <p className="person-info">{desc}</p>
            </div>
          </div>
        </TinderCard>
        {matched && <NewMatch person={matched} />}
      </div>
      <Actions person={person} likeUser={likeUser} dislikeUser={dislikeUser} />
    </>
  );
};
