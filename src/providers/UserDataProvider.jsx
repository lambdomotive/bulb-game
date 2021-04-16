import React, { createContext, useReducer, useEffect } from "react";


const initialState = { userName: null, bestScore: 0 };

export const UserDataContext = createContext(initialState);

const initState = (state) => {
  const persistedData = localStorage.getItem("save");
  if (persistedData) {
    try {
      const { userName, bestScore } = JSON.parse(persistedData);
      if (Number.isInteger(bestScore) && typeof userName === "string") {
        return {
          userName,
          bestScore,
        };
      }
      return state;
    } catch {
      return state;
    }
  }
  return state;
};

export const userDataReducer = (state, action) => {
  switch (action.type) {
    case "SUBMIT_RESULT":
      if (action.result > state.bestScore) {
        
        return { ...state, bestScore: action.result };
      }
      return { ...state };
    case "SET_USERNAME":
      return { ...state, userName: action.userName };
    default:
      return state;
  }
};

export const UserDataProvider = ({ children }) => {
  const contextValue = useReducer(userDataReducer, initialState, initState);
  
  useEffect(() => {
    localStorage.setItem("save", JSON.stringify(contextValue[0]))
  }, [contextValue])
  
  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  );
};
