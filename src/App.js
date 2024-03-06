import { useEffect } from 'react';
import Game from './Game';
import { getGUID } from './Communications';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const setCookie = (cookieKey, cookieValue, expirationDays) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);
  document.cookie = `${cookieKey}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/`;
}

const getCookie = (cookieKey) => {
  const name = `${cookieKey}=`;
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

// Check whether user is on mobile or desktop
const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;
const backend = isTouchDevice ? TouchBackend : HTML5Backend;

const App = () => {
  const cookieKey = 'userId';

  useEffect(() => {
    // If the user doesn't have an identification cookie,
    // create one and give it to them
    if (getCookie(cookieKey) === null) {
      getGUID((guid) => {
        setCookie(cookieKey, guid, 99999);
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