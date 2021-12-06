import { Button } from "@mui/material";

import { useRouter } from "next/router";

import firebase from "../firebase/clientApp"; // Initializes Firebase
import { getAuth } from "firebase/auth";

function InvalidEmail() {
  const auth = getAuth();
  const router = useRouter();

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ margin: 100 }}>👋 Welcome to WhoDat</h2>
      <h3>{`Work Email Only`}</h3>
      <div style={{ marginBottom: 30 }}>
        <i>
          {`Please log out, then log back in with your work email - it's how we connect you to your co-workers.`}
        </i>
      </div>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          auth.signOut();
          router.push("/");
        }}
      >
        Log out ✌️
      </Button>
    </div>
  );
}

export default InvalidEmail;
