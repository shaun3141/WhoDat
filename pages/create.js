import { useEffect, useState } from "react";

import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import firebase from "../firebase/clientApp";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import Head from "next/head";

export default function Record() {
  useEffect(() => {}, []);
  const [gameName, setGameName] = useState("");
  const [games, gamesLoading, error] = useCollection(
    collection(getFirestore(firebase), "games"),
    {}
  );

  const Input = styled("input")({
    display: "none",
  });

  if (!gamesLoading && games) {
    games.docs.map((doc) => console.log(doc.data()));
  }

  return (
    <>
      <Head>
        <title>WhoDat | Create Game</title>
      </Head>
      <div style={{ textAlign: "center" }}>
        <h1>Create a new Game</h1>
        <div style={{ display: "inline-block", width: 300 }}>
          <TextField
            id="outlined-basic"
            label="Game Name"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={(e) => setGameName(e.target.value)}
          />
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
            />
            <Button
              variant="outlined"
              component="span"
              style={{ width: "100%", marginTop: 30 }}
            >
              Upload a Logo (Optional)
            </Button>
          </label>
          <div>
            <Button
              variant="contained"
              disabled={gameName ? false : true}
              style={{ width: "100%", marginTop: 30 }}
              onClick={async () => {
                try {
                  const docRef = await addDoc(
                    collection(getFirestore(firebase), "games"),
                    {
                      name: gameName,
                    }
                  );
                  console.log("Game created, id: ", docRef.id);
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
              }}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
