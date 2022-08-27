import Cookies from "js-cookie";

export const userReducers = (
  state = Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")) : null,
  action
) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    case "VERIFY":
      return { ...state, verified: action.payload };
    case "UPDATE_PICTURE":
      return { ...state, picture: action.payload };
    default:
      return state;
  }
};
