import Head from "next/head";

import { setup, isSupported } from "@loomhq/loom-sdk";
import { oembed } from "@loomhq/loom-embed";
import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Grid,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import LoopIcon from "@mui/icons-material/Loop";
import "@egjs/flicking-plugins/dist/arrow.css";
import firebase from "../firebase/clientApp";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import prompts from "../components/prompts";

const API_KEY = "68b7bc76-7a37-44a0-82dd-9ed12a18d467";
const BUTTON_ID = "loom-sdk-button";

export default function Me(props) {
  const store = getFirestore(firebase);

  const [name, setName] = useState("");
  const [nameLoading, setNameLoading] = useState(null);
  const [nickname, setNickname] = useState("");
  const [nicknameLoading, setNicknameLoading] = useState(null);
  const [pronouns, setPronouns] = useState("");
  const [pronounsLoading, setPronounsLoading] = useState(null);
  const [title, setTitle] = useState("");
  const [titleLoading, setTitleLoading] = useState(null);
  const [bio, setBio] = useState("");
  const [bioLoading, setBioLoading] = useState(null);

  const [errorOccured, setErrorOccured] = useState(false);
  const [promptId, setPromptId] = useState(
    Math.floor(Math.random() * prompts.length)
  );

  const [currentUser, currentUserLoading, currentUserError] = useDocument(
    props.authUser ? doc(store, "users", props.authUser.uid) : undefined,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    async function setupLoom() {
      const { supported, error } = await isSupported();

      if (!supported) {
        console.warn(`Error setting up Loom: ${error}`);
        return;
      }

      const button = document.getElementById(BUTTON_ID);

      if (!button) {
        return;
      }

      const { configureButton } = await setup({
        apiKey: API_KEY,
        insertButtonText: "I'm Done!",
        bubbleResizable: true,
      });

      const sdkButton = configureButton({ element: button });

      sdkButton.on("insert-click", async (video) => {
        // Use the Loom Embed SDK to generate an HTML Embed
        const { html } = await oembed(video.sharedUrl, { width: 521 });

        // Ensure no weirld Loom bugs get introduced
        // Buggy iframe returned was:
        // <iframe src="https://www.loom.com/embed/f74860a497a54ed88a499cd8c959e16b" frameborder="0" width="12009599006321320" height="9007199254740991" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        const processedHtml = html
          .replace(`width="12009599006321320"`, `width="521"`)
          .replace(`height="9007199254740991"`, `height="390.75"`);

        let profile = (currentUser && currentUser.data())?.profile || {};
        let recordings = profile.recordings || [];
        recordings.push({
          ...prompts[promptId],
          videoUrl: video.sharedUrl,
          videoHTML: processedHtml,
        });
        profile = { ...profile, recordings: recordings };

        // Create a new prompt if the user wants to make another video
        setPromptId(Math.floor(Math.random() * prompts.length));

        // setVideoHTML(html);

        // Upload the updated profile to Firebase
        try {
          await updateDoc(
            doc(store, "users", (currentUser && currentUser.data())?.uid),
            {
              profile: profile,
            }
          );
        } catch (e) {
          console.error("Error updating document: ", e);
          setErrorOccured(true);
        }
      });
    }

    setupLoom();
  }, [currentUser, store, promptId]);

  return (
    <>
      <Head>
        <title>WhoDat | Me</title>
      </Head>

      {currentUserLoading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", margin: "100px" }}
        >
          <CircularProgress size={100} />
        </Box>
      )}

      {!currentUserLoading && (
        <Box
        // style={{
        //   textAlign: "center",
        //   display: "flex",
        //   flexWrap: "wrap",
        //   justifyContent: "center",
        // }}
        >
          <Grid container spacing={2}>
            <Paper style={{ padding: 10 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box style={{ fontSize: 24, fontWeight: "bold" }}>
                    Your Profile
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    style={{ margin: "15px auto" }}
                    helperText="This is what people will need to type in to guess who you are."
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {nameLoading}
                        </InputAdornment>
                      ),
                    }}
                    value={
                      name ||
                      (currentUser && currentUser.data())?.profile?.name ||
                      ""
                    }
                    onChange={async (e) => {
                      setName(e.target.value);
                      let profile = currentUser.data()?.profile || {};
                      profile = { ...profile, name: e.target.value };
                      setNameLoading(<FormLoadingSpinner />);
                      try {
                        await updateDoc(doc(store, "users", props.user.uid), {
                          profile: profile,
                        });
                        setNameLoading(<CheckIcon color="success" />);
                      } catch (e) {
                        console.error("Error updating document: ", e);
                        setErrorOccured(true);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="nickname"
                    label="Nickname (optional)"
                    variant="outlined"
                    fullWidth
                    style={{ margin: "15px auto" }}
                    helperText="This will show up like 'Name (nickname)' and be searchable when folks are guessing."
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {nicknameLoading}
                        </InputAdornment>
                      ),
                    }}
                    value={
                      nickname ||
                      (currentUser && currentUser.data())?.profile?.nickname ||
                      ""
                    }
                    onChange={async (e) => {
                      setNickname(e.target.value);
                      let profile = currentUser.data().profile || {};
                      profile = { ...profile, nickname: e.target.value };
                      setNicknameLoading(<FormLoadingSpinner />);
                      try {
                        await updateDoc(doc(store, "users", props.user.uid), {
                          profile: profile,
                        });
                        setNicknameLoading(<CheckIcon color="success" />);
                      } catch (e) {
                        console.error("Error updating document: ", e);
                        setErrorOccured(true);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="pronouns"
                    label="Preferred Pronouns (optional)"
                    variant="outlined"
                    fullWidth
                    style={{ margin: "15px auto" }}
                    helperText="For example, 'she/her'"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {pronounsLoading}
                        </InputAdornment>
                      ),
                    }}
                    value={
                      pronouns ||
                      (currentUser && currentUser.data())?.profile?.pronouns ||
                      ""
                    }
                    onChange={async (e) => {
                      setPronouns(e.target.value);
                      let profile = currentUser.data()?.profile || {};
                      profile = { ...profile, pronouns: e.target.value };
                      setPronounsLoading(<FormLoadingSpinner />);
                      try {
                        await updateDoc(doc(store, "users", props.user.uid), {
                          profile: profile,
                        });
                        setPronounsLoading(<CheckIcon color="success" />);
                      } catch (e) {
                        console.error("Error updating document: ", e);
                        setErrorOccured(true);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="title"
                    label="Title / What do you do?"
                    variant="outlined"
                    fullWidth
                    style={{ margin: "15px auto" }}
                    helperText="For example, 'VP of Engineering'"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {titleLoading}
                        </InputAdornment>
                      ),
                    }}
                    value={
                      title ||
                      (currentUser && currentUser.data())?.profile?.title ||
                      ""
                    }
                    onChange={async (e) => {
                      setTitle(e.target.value);
                      let profile = currentUser.data()?.profile || {};
                      profile = { ...profile, title: e.target.value };
                      setTitleLoading(<FormLoadingSpinner />);
                      try {
                        await updateDoc(doc(store, "users", props.user.uid), {
                          profile: profile,
                        });
                        setTitleLoading(<CheckIcon color="success" />);
                      } catch (e) {
                        console.error("Error updating document: ", e);
                        setErrorOccured(true);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="bio"
                    label="Bio / Fun Fact / Something Extra"
                    style={{
                      margin: "15px auto",
                      width: "100%",
                      marginTop: -10,
                    }}
                    helperText="Add whatever you'd like here, we'll show it to folks once they guess."
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {bioLoading}
                        </InputAdornment>
                      ),
                    }}
                    value={
                      bio ||
                      (currentUser && currentUser.data())?.profile?.bio ||
                      ""
                    }
                    onChange={async (e) => {
                      setBio(e.target.value);
                      let profile = currentUser.data()?.profile || {};
                      profile = { ...profile, bio: e.target.value };
                      setBioLoading(<FormLoadingSpinner />);
                      try {
                        await updateDoc(doc(store, "users", props.user.uid), {
                          profile: profile,
                        });
                        setBioLoading(<CheckIcon color="success" />);
                      } catch (e) {
                        console.error("Error updating document: ", e);
                        setErrorOccured(true);
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Grid item xs={12} style={{ height: 30 }}></Grid>
            <Grid item xs={12} md={6} style={{ paddingLeft: 0 }}>
              <Paper style={{ padding: 10 }}>
                <Box
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  Introduce Yourself
                </Box>
                <Box style={{ fontStyle: "italic", lineHeight: "1.4em" }}>
                  {`The goal of WhoDat is to get to know your co-workers through fun facts and actually seeing their face.
                    When you click the button below, you'll be prompted to make a quick video about yourself.
                    This video will be shown to your co-workers and they will have to guess your name just from the video.`}
                </Box>
                <Button
                  variant="contained"
                  id={BUTTON_ID}
                  style={{
                    width: "100%",
                    height: 160,
                    fontSize: 42,
                    margin: "20px 0",
                  }}
                >
                  <Box>
                    <Box style={{ fontSize: 24 }}>
                      {prompts[promptId].prompt}
                    </Box>
                    <Box style={{ fontSize: 16 }}>
                      {prompts[promptId].description}
                    </Box>
                  </Box>
                </Button>

                <Box
                  style={{
                    textAlign: "center",
                    fontStyle: "italic",
                    marginTop: -10,
                  }}
                >
                  Click the button above to start recording, or{" "}
                  <span
                    style={{
                      color: "#1976d2",
                      cursor: "pointer",
                      marginLeft: -3,
                    }}
                    onClick={() => {
                      console.log("Refreshing");
                      setPromptId(Math.floor(Math.random() * prompts.length));
                    }}
                  >
                    <LoopIcon
                      // sx={{ fontSize: 24 }}
                      style={{
                        fontSize: "20px",
                        paddingTop: "5px",
                        marginBottom: "-3px",
                      }}
                    />
                    get a new prompt
                  </span>{" "}
                  to record.
                </Box>

                <Box>
                  <Box
                    style={{
                      marginTop: 18,
                      fontSize: "1.2em",
                      fontWeight: "bold",
                    }}
                  >
                    Quick Tips
                  </Box>
                  <Box>
                    <ul>
                      <li>{"👍 Keep it between 5 and 30 seconds"}</li>
                      <li>{`👍 When recording, select "Camera Only" video in "Video Settings"`}</li>
                      <li>
                        {"👎 Do "}
                        <b>NOT</b>
                        {
                          " say your name - folks will be guessing that based on your video!"
                        }
                      </li>
                    </ul>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper style={{ padding: 10 }}>
                <Box
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  {`${
                    (currentUser && currentUser.data())?.profile?.recordings
                      ?.length || 0
                  }/5 Saved Recordings`}
                </Box>
                <Box>
                  {(
                    currentUser && currentUser.data()
                  )?.profile?.recordings?.map((r) => {
                    return (
                      <Box key={r.videoUrl}>
                        <Box style={{ padding: 5, fontWeight: "bold" }}>
                          {r.prompt}
                        </Box>
                        <Box style={{ padding: "5px" }}>
                          <i>{r.description}</i>
                        </Box>
                        <Box
                          dangerouslySetInnerHTML={{ __html: r.videoHTML }}
                        ></Box>
                      </Box>
                    );
                  })}
                </Box>
                {!(currentUser && currentUser.data())?.profile?.recordings
                  ?.length && (
                  <Box style={{ fontStyle: "italic", lineHeight: "1.4em" }}>
                    {`It's easy to start, make your first recording by clicking the button on the left and following the prompt.`}
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

      <Snackbar
        open={errorOccured}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setErrorOccured(false);
        }}
        message="An Error Occured. If you're nerdy, open the dev console for details."
      />
    </>
  );
}

function FormLoadingSpinner() {
  return <CircularProgress size={24} />;
}
