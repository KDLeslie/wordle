import { useEffect, useState } from 'react';
import Game from './Game';

const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    createToken();
  }, [])
  
  const createToken = () => {
    let token = "";
    let number = Math.floor(Math.random() * 10000000000);
    setToken(token + number);
  };

  return (
    <Game sessionToken={token} createToken={createToken} />
  );
}

export default App;