export const getProfileInfo = async (accessToken, resultHandler) => {
  let apiUrl = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json'
    }
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(response.statusText + ": " + text);
  }
  const parsedResponse = await response.json();
  resultHandler(parsedResponse);
};

export const getGoogleClientID = async (resultHandler) => {
  let apiUrl = '/api/GetGoogleClientID';
  if (process.env.NODE_ENV !== 'production') {
    apiUrl = 'http://localhost:7022' + apiUrl;
  }
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(response.statusText + ": " + text);
  }
  const parsedResponse = await response.json();
  resultHandler(parsedResponse);
};

export const getGUID = async (resultHandler) => {
  let apiUrl = '/api/GetGUID';
  if (process.env.NODE_ENV !== 'production') {
    apiUrl = 'http://localhost:7022' + apiUrl;
  }
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.guid);
};

export const setSession = async (sessionToken, email) => {
  let apiUrl = '/api/SetSession';
  if (process.env.NODE_ENV !== 'production') {
    apiUrl = 'http://localhost:7022' + apiUrl;
  }
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({sessionToken, email})
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(response.statusText + ": " + text);
  }
};

export const removeSessions = async (sessions) => {
  let apiUrl = '/api/RemoveSessions';
  if (process.env.NODE_ENV !== 'production') {
    apiUrl = 'http://localhost:7022' + apiUrl;
  }
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({sessions: sessions}, 
      (key, value) => value === undefined ? null : value),
    keepalive: true
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(response.statusText + ": " + text);
  }
};

export const validateGuess = async (guess, resultHandler) => {
  let apiUrl = '/api/ValidateGuess';
  if (process.env.NODE_ENV !== 'production') {
    apiUrl = 'http://localhost:7022' + apiUrl;
  }
  const response = await fetch(apiUrl, {
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
  let apiUrl = '/api/CheckGuess';
  if (process.env.NODE_ENV !== 'production') {
    apiUrl = 'http://localhost:7022' + apiUrl;
  }
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({guess, sessionToken, email})
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(response.statusText + ": " + text);
  }
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.colours);
};

export const getAnswer = async (sessionToken, email, resultHandler) => {
  let apiUrl = '/api/GetAnswer';
  if (process.env.NODE_ENV !== 'production') {
    apiUrl = 'http://localhost:7022' + apiUrl;
  }
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({sessionToken, email})
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(response.statusText + ": " + text);
  }
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.word);
};

export const getRatio = async (email, resultHandler) => {
  let apiUrl = '/api/GetRatio';
  if (process.env.NODE_ENV !== 'production') {
    apiUrl = 'http://localhost:7022' + apiUrl;
  }
  const response = await fetch(apiUrl, {
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
  let apiUrl = '/api/IncrementNumerator';
  if (process.env.NODE_ENV !== 'production') {
    apiUrl = 'http://localhost:7022' + apiUrl;
  }
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({email})
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(response.statusText + ": " + text);
  }
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.score);
};

export const incrementDenominator = async (email, resultHandler) => {
  let apiUrl = '/api/IncrementDenominator';
  if (process.env.NODE_ENV !== 'production') {
    apiUrl = 'http://localhost:7022' + apiUrl;
  }
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({email})
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(response.statusText + ": " + text);
  }
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.score);
};