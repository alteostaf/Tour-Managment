import { createContext, useEffect, useReducer } from "react";

// Initial state
const storedUser = localStorage.getItem('user');
let initialUser = null;
try {
  initialUser = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
  console.error('Error parsing stored user data:', error);
}

const initial_state = {
  user: initialUser,
  loading: false,
  error: null,
};

// Create context
export const AuthContext = createContext(initial_state);

// Action types
const LOGIN_START = "LOGIN_START";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const LOGOUT = "LOGOUT";

// Reducer
const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        user: null,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case LOGOUT:
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// Context provider
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    // Save user state to local storage whenever it changes
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
