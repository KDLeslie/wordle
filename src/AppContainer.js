import { useEffect, useState } from 'react';
import { getGoogleClientID } from './Communications';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import { SnackbarProvider } from 'notistack';

// Check whether user is on mobile or desktop
const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;
const backend = isTouchDevice ? TouchBackend : HTML5Backend;

const AppContainer = () => {
  const [clientID, setClientID] = useState(null);

  useEffect(() => {
    if (!clientID) {
      getGoogleClientID((result) => setClientID(result.clientID)).catch((error) => {
        alert(error + ". Please try refreshing the page");
      });
    }
  }, [clientID]);

  return (
    clientID &&
      <SnackbarProvider
        maxSnack={1}
        autoHideDuration={2000}
        style={{fontSize: '20px'}}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'top'
        }}
      >
        <GoogleOAuthProvider clientId={clientID}>
          <DndProvider backend={backend}>
            <App />
          </DndProvider>
        </GoogleOAuthProvider>
      </SnackbarProvider>
  );
};

export default AppContainer;