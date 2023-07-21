import "@/styles/globals.css";
import "@/styles/App.css";
import { UserProvider } from "../pages/contexts/userContext";

function App({ Component, pageProps }) {
  return (
    <UserProvider>
        <Component {...pageProps} />
    </UserProvider>
  );
}

export default App;



