import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

const auth = getAuth();
const google = new GoogleAuthProvider();
const microsoft = new OAuthProvider("microsoft.com");

// Configure FirebaseUI.
const uiConfig = {
  // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // GitHub as the only included Auth Provider.
  // You could add and configure more here!
  signInOptions: [google.providerId, microsoft.providerId],
};

function SignInScreen() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ marginTop: 100 }}>👋 Welcome to WhoDat</h2>
      <h3>{`Let's get you logged in...`}</h3>
      <div>
        <i>
          {`Log in with your work email only - it's how we connect you to your co-workers.`}
        </i>
      </div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
}

export default SignInScreen;
