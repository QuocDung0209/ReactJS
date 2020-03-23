import React, { createContext, useContext, useReducer } from "react";

const initialState = {};

// createContext() method returns an object with a Provider and Consumer component.
// StateContext => {Provider, Consumer}
export const StateContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "changeInfo":
      return {
        ...state,
        info: action.newInfo
      };

    case "update":
      return {
        ...state,
        update: action.update
      };

    default:
      return state;
  }
};

//StateProvider component returned Provider component with a value prop of state and dispatch from the useReducer Hook.
// {state, dispatch} becomes available in any component in your app component tree.
// Khi chúng ta cần thao tác vs state => call the dispatch method and pass in an object with the desired type as its argument.
// dispatch({ type: 'action description' })
export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

// Normally you would use useContext(StateContext) everywhere inside your app, where you would like to access the value of the context. => Don't repeat
// useStateValue is basically a custom hook => use to access your state in any component of your application => it returns [state, dispatch] - that is passed as a "value" to our Provider
export const useStateValue = () => useContext(StateContext);
