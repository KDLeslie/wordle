import { useEffect } from 'react';
import Game from './Game';
import { getGUID } from './Requests';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

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

const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;
const backend = isTouchDevice ? TouchBackend : HTML5Backend;


const App = () => {
  const cookieKey = 'userId';

  useEffect(() => {
    if (getCookie(cookieKey) === null) {
      getGUID((guid) => {
        setCookieIfNotExists(cookieKey, guid, 99999); 
      });
    }
  }, []);

  return (
    <DndProvider backend={backend}>
      <Game />
    </DndProvider>
  );
};

export default App;