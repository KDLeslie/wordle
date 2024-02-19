
export const guessToJson = (word, sessionToken) => {
    return {
      Chars: word,
      Token: sessionToken
    }
  };

  const tokenToJson = (sessionToken) => {
    return {
      Token: sessionToken
    }
  };

export const setSession = async (token, resultHandler) => {
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
      body: JSON.stringify(tokenToJson(token))
    })
    // resultHandler(false);
  }

export const validateGuess = async (word, sessionToken) => {
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
      body: JSON.stringify(guessToJson(word, sessionToken))
    })
    const parsedResponse = await response.json();
    return parsedResponse.valid;
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
      body: JSON.stringify(guessToJson(word, sessionToken))
    })
    const parsedResponse = await response.json();
    resultHandler(parsedResponse.colours)
  }

export const getAnswer = async (word, sessionToken, resultHandler) => {
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
      body: JSON.stringify(guessToJson(word, sessionToken))
    })
    const parsedResponse = await response.json();
    resultHandler(parsedResponse.word);
  }