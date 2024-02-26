export const setSession = async (sessionToken) => {
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
    },
  })
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.guid);
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

export const getScore = async (resultHandler) => {
  let getAPI = '/api/GetScore';
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

export const incrementScore = async (resultHandler) => {
  let getAPI = '/api/IncrementScore';
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