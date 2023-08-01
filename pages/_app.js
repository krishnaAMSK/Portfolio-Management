import "@/styles/globals.css";
import "@/styles/App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "../pages/contexts/userContext";

function App({ Component, pageProps }) {
  return (
    <UserProvider>
        <Component {...pageProps} />
        <ToastContainer position="top-center" autoClose={2000} />
    </UserProvider>
  );
}

export default App;



