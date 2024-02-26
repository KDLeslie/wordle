import { useEffect } from 'react';
import Game from './Game';
import { getGUID } from './Requests';

const App = () => {

  useEffect(() => {
    if (getCookie('userId') === null) {
      getGUID((guid) => {
        setCookieIfNotExists("userId", guid, 999999); 
      });
    }
  }, []);

  const setCookieIfNotExists = (cookieName, cookieValue, expirationDays) => {
    if (!getCookie(cookieName)) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + expirationDays);
      document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/`;
    }
  }

  const getCookie = (cookieName) => {
    const name = `${cookieName}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }

  return (
    <Game />
  );
};

export default App;