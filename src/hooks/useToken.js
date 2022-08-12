import { useEffect, useState } from 'react';

// use global variables
let token = null;
let observers = [];

// changes global token state and updates all observers
export const setToken = (accessToken) => {
  token = accessToken;
  observers.forEach((update) => update(token));
};

// React Hook
export const useToken = () => {
  const [tokenState, setTokenState] = useState(token);

  useEffect(() => {
    // add setTokenState to observers list
    observers.push(setTokenState);

    // update tokenState with latest global token state
    setTokenState(token);

    // remove this setTokenState from observers, when component unmounts
    return () => {
      observers = observers.filter((update) => update !== setTokenState);
    };
  }, []);

  // return global token state and setter function
  return [tokenState, setToken];
};
