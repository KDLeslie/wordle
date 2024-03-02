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
    },
  })
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.guid);
};

export const setSession = async (sessionToken, resultHandler) => {
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
    body: JSON.stringify({sessionToken})
  })
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
  })
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.valid);
};

export const checkGuess = async (guess, sessionToken, resultHandler) => {
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
    body: JSON.stringify({guess, sessionToken})
  })
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.colours);
};

export const getAnswer = async (sessionToken, resultHandler) => {
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
    body: JSON.stringify({sessionToken})
  })
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.word);
};

export const getRatio = async (resultHandler) => {
  let getAPI = '/api/GetRatio';
  if (process.env.NODE_ENV !== 'production') {
    getAPI = 'http://localhost:7022' + getAPI;
  }
  const response = await fetch(getAPI, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.score);
};

export const incrementNumerator = async (resultHandler) => {
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
  })
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.score);
};

export const incrementDenominator = async (resultHandler) => {
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
  })
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.score);
};