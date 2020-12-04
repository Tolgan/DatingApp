import React, { useContext, useEffect } from "react";
import { Person } from "./components/Person";
import { Context } from "./components/context/UserContext";
import Lonely from "./components/Lonely";
import data from "./data.json";

export default function App() {
  const contexts = useContext(Context);
  const {
    people,
    likeUser,
    login,
    logout,
    activeUser,
    getUsers,
    dislikeUser,
    matched,
  } = contexts;

  useEffect(() => {
    getUsers();
  }, [activeUser, people.length]);
  const person = people[0];

  return (
    <>
      {activeUser ? (
        <>
          {people[0] ? (
            <Person
              person={person}
              likeUser={likeUser}
              dislikeUser={dislikeUser}
              matched={matched}
            />
          ) : (
            <Lonely />
          )}
          <button className="mainbutton" onClick={() => logout()}>
            Logout
          </button>
        </>
      ) : (
        data.map((user) => (
          <div key={user.name}>
            <button className="mainbutton" onClick={() => login(user.name)}>
              {user.name}
            </button>
          </div>
        ))
      )}
    </>
  );
}
