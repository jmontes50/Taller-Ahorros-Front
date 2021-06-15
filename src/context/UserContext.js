import {useState, createContext } from 'react';
export const UserContext = createContext(null);

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const setAuthUser = (uid) => {
    setUser(uid);
  }

  return(
    <UserContext.Provider value={{user, setAuthUser}}>
      {props.children}
    </UserContext.Provider>
  )

}

export default UserContextProvider;