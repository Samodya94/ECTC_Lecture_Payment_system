import { createContext, useReducer, useEffect } from "react";

export const LecAuthContext = createContext();

export const authReducer = (state, acton) => {
  switch (acton.type) {
    case "LOGIN":
      return { lecturer: acton.payload };
    case "LOGOUT":
      return { lecturer: null };
    default:
      return state;
  }
};

export const LecAuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    lecturer: null,
  });

  useEffect(() =>{
    const lecturer = JSON.parse(localStorage.getItem('lecturer'))

    if(lecturer){
        dispatch({type: 'LOGIN', payload: lecturer})
    }
}, [])


  console.log("AuthContext state: ", state);

  return (
    <LecAuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LecAuthContext.Provider>
  );
};
