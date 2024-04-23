import { useState, useEffect } from 'react';

export interface User {
    userName:string;
    password:string;
    name:string
}
export function useAuth() {
  const [ user, setUser ] = useState<User | null>();

const login = async (userName:string, password:string) => {
    if(userName === 'dayan@gmail.com' && password === '123'){
        setUser({ userName, password, name:'dayan'});
        localStorage.setItem('user', JSON.stringify({ userName, password }));
    }
};
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // On initial render, check if a user is already logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return { user, login, logout, setUser };
}
