export const getProfileInfo = async (access_token, resultHandler) => {
  let getAPI = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`;
  const response = await fetch(getAPI, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json'
    }
  });
  // TODO: Give all these error handling
  const parsedResponse = await response.json();
  resultHandler(parsedResponse);
};

export const getGoogleClientID = async (resultHandler) => {
  let getAPI = '/api/GetGoogleClientID';
  if (process.env.NODE_ENV !== 'production') {
    getAPI = 'http://localhost:7022' + getAPI;
  }
  const response = await fetch(getAPI, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  });
  const parsedResponse = await response.json();
  resultHandler(parsedResponse);
};

export const getGUID = async (resultHandler) => {
  let getAPI = '/api/GetGUID';
  if (process.env.NODE_ENV !== 'production') {
    getAPI = 'http://localhost:7022' + getAPI;
  }
  const response = await fetch(getAPI, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.guid);
};

export const setSession = async (sessionToken, email, resultHandler) => {
  let getAPI = '/api/SetSession';
  if (process.env.NODE_ENV !== 'production') {
    getAPI = 'http://localhost:7022' + getAPI;
  }
  await fetch(getAPI, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({sessionToken, email})
  });
  resultHandler();
};

export const validateGuess = async (guess, resultHandler) => {
  let getAPI = '/api/ValidateGuess';
  if (process.env.NODE_ENV !== 'production') {
    getAPI = 'http://localhost:7022' + getAPI;
  }
  const response = await fetch(getAPI, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({guess})
  });
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.valid);
};

export const checkGuess = async (guess, sessionToken, email, resultHandler) => {
  let getAPI = '/api/CheckGuess';
  if (process.env.NODE_ENV !== 'production') {
    getAPI = 'http://localhost:7022' + getAPI;
  }
  const response = await fetch(getAPI, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({guess, sessionToken, email})
  });
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.colours);
};

export const getAnswer = async (sessionToken, email, resultHandler) => {
  let getAPI = '/api/GetAnswer';
  if (process.env.NODE_ENV !== 'production') {
    getAPI = 'http://localhost:7022' + getAPI;
  }
  const response = await fetch(getAPI, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({sessionToken, email})
  });
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.word);
};

export const getRatio = async (email, resultHandler) => {
  let getAPI = '/api/GetRatio';
  if (process.env.NODE_ENV !== 'production') {
    getAPI = 'http://localhost:7022' + getAPI;
  }
  const response = await fetch(getAPI, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({email})
  });
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.score);
};

export const incrementNumerator = async (email, resultHandler) => {
  let getAPI = '/api/IncrementNumerator';
  if (process.env.NODE_ENV !== 'production') {
    getAPI = 'http://localhost:7022' + getAPI;
  }
  const response = await fetch(getAPI, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({email})
  });
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.score);
};

export const incrementDenominator = async (email, resultHandler) => {
  let getAPI = '/api/IncrementDenominator';
  if (process.env.NODE_ENV !== 'production') {
    getAPI = 'http://localhost:7022' + getAPI;
  }
  const response = await fetch(getAPI, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({email})
  });
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.score);
};