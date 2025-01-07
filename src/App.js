import { useEffect, useState } from 'react';
import Game from './Game';
import { getGUID, getProfileInfo } from './services/Communications';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useSnackbar } from 'notistack';

const setCookie = (cookieKey, cookieValue, expirationDays) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);
  document.cookie = `${cookieKey}=${cookieValue}; \
  expires=${expirationDate.toUTCString()}; path=/`;
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

const App = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const {enqueueSnackbar} = useSnackbar();

  const cookieKey = 'userId';

  useEffect(() => {
    if (user) {
      getProfileInfo(user.access_token, setProfile).catch((error) => {
        enqueueSnackbar(error.message + " Please try again later", {variant: "error"})
      });
    };

    // if the user doesn't have an identification cookie,
    // create one and give it to them
    if (!getCookie(cookieKey)) {
      getGUID((guid) => setCookie(cookieKey, guid, 99999)).catch((error) => {
        enqueueSnackbar(error.message + " Please try again later", {variant: "error"})
      });
    };
  }, [user, enqueueSnackbar]);

  const handleLogIn = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => enqueueSnackbar(error.message, {variant: "error"}),
  });

  const handleLogOut = () => {
    googleLogout();
    setProfile(null);
    setUser(null);
  };

  return (
    <Game
      profile={profile}
      handleLogIn={handleLogIn}
      handleLogOut={handleLogOut}
    />
  );
};

export default App;