import "@/styles/globals.css";
import "@/styles/App.css";
import "@/styles/confirmAlert.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../pages/contexts/userContext";
import { useEffect, useState, useRef} from "react";
import axios from "axios";

function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const [authenticated, setAuthenticated] = useState(false); 
  const userRef = useRef(null);

  useEffect(() => {
    setInitialCheckDone(false);
    const checkUserAuthentication = async () => {
      try {
        const user = await axios.get("/api/user");
        console.log(user.data);
        if (user.data.success) {
          if (user.data.login) {
            setUser(JSON.parse(user.data.user));
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setInitialCheckDone(true);
      }
    };
    checkUserAuthentication();
  }, []);

  useEffect(() => {
    if (initialCheckDone) {
      setAuthenticated(true);
    }
  }, [initialCheckDone, authenticated, pageProps.protected]);

  useEffect(() => {
    if (userRef.current !== user) {
      // This useEffect will be triggered once after the `user` state changes
      // You can place your logic here that you want to execute when `user` changes
      console.log('User updated:', user);
      userRef.current = user;
    }
  }, [user]);

  if (pageProps.protected && authenticated && !user) {
    console.log('From app.js');
    console.log(initialCheckDone);
    console.log(user);
    setAuthenticated(false)
    return <div>Access Denied</div>;
  }

  if (!initialCheckDone) {
    return <div>Loading...</div>; 
  }

  // if (pageProps.protected && !authenticated) {
  //   console.log('From app.js');
  //   console.log(initialCheckDone);
  //   console.log(user);
  //   return <div>Access Denied</div>;
  // }

  if (
    pageProps.protected &&
    authenticated &&
    pageProps.userTypes &&
    pageProps.userTypes.indexOf(user?.type) === -1
  ) {
    return <div>Restricted Access</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
      <ToastContainer position="top-center" autoClose={2000} />
    </UserContext.Provider>
  );
}

export default App;
