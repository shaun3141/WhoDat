import { useEffect, useState } from "react";

import { Box, Paper, Button, Chip, InputBase, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import firebase from "../firebase/clientApp";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import Head from "next/head";

export default function Settings(props) {
  useEffect(() => {}, []);
  const store = getFirestore(firebase);
  const [organization, setOrganization] = useState(null);
  // const [organizations, organizationsLoading, error] = useCollection(
  //   collection(store, "organizations"),
  //   {}
  // );

  useEffect(() => {
    async function fetchData() {
      try {
        const org = await getDoc(
          doc(store, "organizations", props.user.organization)
        );
        setOrganization(org.data());
        console.log("org", org.data());
      } catch (e) {
        console.error("Error updating document: ", e);
        // setErrorOccured(true);
      }
    }
    fetchData();
  }, [props.user, store]);

  const defaultEmailDomain = props.user && props.user.email.split("@")[1];

  const Input = styled("input")({
    display: "none",
  });

  // if (!organizationsLoading && organizations) {
  //   organizations.docs.map((doc) => console.log(doc.data()));
  // }

  return (
    <>
      <Head>
        <title>WhoDat | Settings</title>
      </Head>
      <div style={{ textAlign: "center" }}>
        <h1>Settings</h1>
        <div style={{ display: "inline-block", width: 300 }}>
          {/* <TextField
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
          </label> */}

          <div
            style={{
              textAlign: "left",
              marginTop: 20,
            }}
          >
            <Box>
              <label style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                Supported Email Domains
              </label>
              <Box style={{ margin: "15px 0px", fontStyle: "italic" }}>
                {`Folks join WhoDat with their work email address. If their domain
                matches a domain here, they will be part of your WhoDat game.
                "Domain" is defined as what is after the "@" in your email
                address.`}
                <br></br>
                <br></br>
                This feature is useful when people at the same organization have
                different potential endings for their email address.
              </Box>
            </Box>

            <Chip
              style={{ margin: "10px 0px" }}
              label={defaultEmailDomain}
              variant="outlined"
            />

            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 300,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="domain.com"
                inputProps={{ "aria-label": "domain" }}
                onChange={(e) => {
                  console.log(e, e.target.value);
                  return "hi";
                }}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <AddIcon />
              </IconButton>
            </Paper>
          </div>

          {/* <div>
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
                      user: props.user.uid,
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
          </div> */}
        </div>
      </div>
    </>
  );
}
