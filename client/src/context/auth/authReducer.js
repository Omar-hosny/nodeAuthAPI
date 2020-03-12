export default (state, action) => {
  switch (action.type) {
    case "LOADED_USER":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case "REGISTER_FAILED":
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};
