import "../styles/globals.css";

import Layout from "./../components/layout";
import firebase from "../firebase/clientApp"; // Initializes Firebase
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { getFirestore, doc } from "firebase/firestore";
import InvalidEmail from "./invalid_email";

function WhoDat({ Component, pageProps }) {
  const [authUser, authUserLoading, error] = useAuthState(getAuth());
  const store = getFirestore(firebase);

  const [user, userLoading, userError] = useDocument(
    authUser ? doc(store, "users", authUser.uid) : undefined,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  if (authUser && authUser.email.indexOf("@gmail") > -1) {
    return (
      <Layout user={authUser}>
        <InvalidEmail
          {...pageProps}
          authUser={authUser}
          authUserLoading={authUserLoading}
          user={user && user.data()}
          userLoading={userLoading}
        />
      </Layout>
    );
  }

  return (
    <Layout user={authUser}>
      <Component
        {...pageProps}
        authUser={authUser}
        authUserLoading={authUserLoading}
        user={user && user.data()}
        userLoading={userLoading}
      />
    </Layout>
  );
}

// WhoDat.getInitialProps = async (ctx) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   // const appProps = await WhoDat.getInitialProps(appContext);
//   const store = getFirestore(firebase);
//   const user =
//     (authUser && (await getDoc(doc(store, "users", authUser.uid)))) || null;

//   console.log(authUser);
//   console.log(user);
//   console.log(user?.profile);

//   return { authUser };
// };

export default WhoDat;
