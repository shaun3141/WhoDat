import "../styles/globals.css";

import Layout from "./../components/layout";
import firebase from "../firebase/clientApp"; // Initializes Firebase
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function WhoDat({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(getAuth());
  console.log(user);

  return (
    <>
      <Layout user={user}>
        <Component {...pageProps} user={user} />
      </Layout>
    </>
  );
}

export default WhoDat;
