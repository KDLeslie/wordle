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
    body: JSON.stringify({sessionToken})
  })
};

export const validateGuess = async (word, resultHandler) => {
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
    body: JSON.stringify({word})
  })
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.valid);
};

export const checkGuess = async (word, sessionToken, resultHandler) => {
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
    body: JSON.stringify({word, sessionToken})
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
    body: JSON.stringify({sessionToken})
  })
  const parsedResponse = await response.json();
  resultHandler(parsedResponse.word);
};