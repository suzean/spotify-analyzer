import Dashboard from './Dashboard';
import React, { useEffect, useState } from "react";
import Login from './Login';
import { useHistory} from "react-router-dom";


const App = () => {
  const history = useHistory();

  const [token, setToken] = useState("");
  

    const hash = window.location.hash.substr(1);
    const result = hash.split('&').reduce(function (res, item) {
      const parts = item.split('=');
      res[parts[0]] = parts[1];
      return res;
    }, {});
    

    useEffect(() => {
        setToken(result.access_token)
    }, [token]);
  
  return token? <Dashboard token={token} history={history}/> : <Login />
  
};

export default App;


