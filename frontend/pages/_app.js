import "@/styles/globals.css";
import "@/styles/App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../pages/contexts/userContext";
import { useEffect, useState } from "react";
import axios from "axios";

function App({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  useEffect(() => {
    setInitialCheckDone(false);
    const checkUserAuthentication = async () => {
          const user = await axios.get("/api/user").then(setInitialCheckDone(true));
          console.log(user.data);
          if (user.data.success) {
            if(user.data.login)
            {
              setUser(JSON.parse(user.data.user));
            }
            else
            {
              setUser(null)
            }
          }
          else
          {
            setUser(null)
          }
          // setInitialCheckDone(true);
        };
        checkUserAuthentication();
  }, [])
  
  if (!initialCheckDone) {
    return <div>Loading...</div>; 
  }

  if (pageProps.protected && !user) {
    console.log('Fromm app.js');
    console.log(initialCheckDone);
    console.log(user)
    return <div>Access Denied</div>
  }

  if (
    pageProps.protected &&
    user &&
    pageProps.userTypes &&
    pageProps.userTypes.indexOf(user.type) === -1
  ) {
    return <div>Restricted Access</div>;
  }

  return (
    <UserContext.Provider value={user}>
      <Component {...pageProps} />
      <ToastContainer position="top-center" autoClose={2000} />
    </UserContext.Provider>
  );
}

export default App;



