import {
  LOGIN_USER,
  LOGOUT_USER,
  GET_USERS,
  LIKE_USER,
  GET_MATCHES,
  DISLIKE_USER,
  GET_LIKED_USERS,
  DELETE_MATCH,
} from "./UserTypes";

export const UserReducer = (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, people: action.payload };
    case LOGIN_USER:
      return {
        ...state,
        activeUser: action.payload,
      };
    case LOGOUT_USER:
      return { ...state, activeUser: null };
    case LIKE_USER:
      return {
        ...state,
        people: [
          ...state.people.filter((person) => person.id !== action.payload.id),
        ],
      };

    case DISLIKE_USER:
      return {
        ...state,
        people: [
          ...state.people.filter((person) => person.id !== action.payload.id),
        ],

        dislikedUsers: [...state.dislikedUsers, action.payload],
      };
    case GET_LIKED_USERS:
      return {
        ...state,
        likedUsers: action.payload,
      };
    case GET_MATCHES:
      return {
        ...state,
        matches: action.payload,
        loading: false,
        successDelete: false,
      };

    case DELETE_MATCH:
      return { ...state, successDelete: true };
    default:
      return state;
  }
};
