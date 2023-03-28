import React from 'react';
import { useState } from 'react';

export const AuthContext = React.createContext(null);

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null
}

export const ContextProvider = props => {
  const [state, setState] = useState(initialState);
  const [user,setUser]=useState('');

  const [projectState,setProjectState]=useState(true);

  const setLoginPending = (isLoginPending) => setState({isLoginPending});
  const setLoginSuccess = (isLoggedIn) => setState({isLoggedIn});
  const setLoginError = (loginError) => setState({loginError});

  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setLoginError(null);
  }

  const login=(name)=>{
    setUser(name);
    setLoginSuccess(true);
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        user,
        projectState,
        setProjectState
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
