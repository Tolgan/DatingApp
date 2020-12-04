import React, { useReducer, useState } from "react";
import { UserReducer } from "./UserReducer";
import axios from "axios";
import {
  LOGIN_USER,
  LOGOUT_USER,
  LIKE_USER,
  DISLIKE_USER,
  GET_USERS,
  DELETE_MATCH,
  GET_MATCHES,
  GET_LIKED_USERS,
} from "./UserTypes";
const Context = React.createContext();

const UserProvider = ({ children }) => {
  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const initialState = {
    people: [],
    matches: [],
    loading: true,
    likedUsers: [],
    dislikedUsers: [],
    activeUser: userInfoFromStorage,
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const [matched, setMatched] = useState(null);

  const login = async (userName) => {
    try {
      const { data } = await axios.get(`/api/users/${userName}`);
      console.log(data);
      data && localStorage.setItem("userInfo", JSON.stringify(data));

      dispatch({
        type: LOGIN_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => {
    localStorage.removeItem("userInfo");
    setMatched(null);
    dispatch({
      type: LOGOUT_USER,
    });
  };
  const getUsers = async () => {
    try {
      const { data } = await axios.post("/api/users", state.activeUser);

      dispatch({
        type: GET_USERS,
        payload: data.people,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const likeUser = async (user) => {
    try {
      const { data } = await axios.post(
        `/api/users/like/${user._id}`,
        state.activeUser
      );

      const matching = data.likedUser.find(
        (user) => user._id === state.activeUser.userId
      );
      matching && setMatched(user);
      console.log(matched);

      dispatch({
        type: LIKE_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const dislikeUser = async (userId) => {
    const { data } = await axios.post(
      `/api/users/dislike/${userId}`,
      state.activeUser
    );
    dispatch({
      type: DISLIKE_USER,
      payload: data,
    });
  };
  const getLikedUsers = async () => {
    try {
      const { data } = await axios.get(
        `/api/users/usersliked/${state.activeUser.userId}`
      );

      dispatch({
        type: GET_LIKED_USERS,
        payload: data.likedUsers,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getMyMatches = async () => {
    try {
      const { data } = await axios.get(
        `/api/users/matched/${state.activeUser.userId}`
      );
      setMatched(null);
      dispatch({ type: GET_MATCHES, payload: data.matches });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMatch = async (userId) => {
    try {
      const { data } = await axios.put(
        `/api/users/matched/${state.activeUser.userId}`,
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      dispatch({ type: DELETE_MATCH, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Context.Provider
      value={{
        successDelete: state.successDelete,
        getMyMatches,
        deleteMatch,
        matches: state.matches,
        people: state.people,
        likeUser,
        likedUsers: state.likedUsers,
        getUsers,
        getLikedUsers,
        login,
        setMatched,
        matched,
        logout,
        activeUser: state.activeUser,
        dislikeUser,
        loading: state.loading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { UserProvider, Context };
