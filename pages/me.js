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
  const [videoHtmls, setVideoHtmls] = useState([]);

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

        let profile = props.user.profile || {};
        let recordings = profile.recordings || [];
        recordings.push({
          ...prompts[promptId],
          videoUrl: video.sharedUrl,
          videoHTML: html,
        });
        profile = { ...profile, recordings: recordings };

        // Create a new prompt if the user wants to make another video
        setPromptId(Math.floor(Math.random() * prompts.length));

        // setVideoHTML(html);

        // Upload the updated profile to Firebase
        try {
          await updateDoc(doc(store, "users", props.user.uid), {
            profile: profile,
          });
        } catch (e) {
          console.error("Error updating document: ", e);
          setErrorOccured(true);
        }
      });
    }

    setupLoom();
  }, [props.user, store, promptId]);

  return (
    <>
      <Head>
        <title>WhoDat | Me</title>
      </Head>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            width: "40%",
            padding: 20,
            display: "inline-block",
            textAlign: "left",
          }}
        >
          <Paper style={{ padding: 10 }}>
            <Box style={{ fontSize: 24, fontWeight: "bold" }}>Your Profile</Box>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              fullWidth
              style={{ margin: "15px auto" }}
              helperText="This is what people will need to type in to guess who you are."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{nameLoading}</InputAdornment>
                ),
              }}
              value={name || (props.user && props.user?.profile?.name) || ""}
              onChange={async (e) => {
                setName(e.target.value);
                let profile = props.user.profile || {};
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
                nickname || (props.user && props.user?.profile?.nickname) || ""
              }
              onChange={async (e) => {
                setNickname(e.target.value);
                let profile = props.user.profile || {};
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
                pronouns || (props.user && props.user?.profile?.pronouns) || ""
              }
              onChange={async (e) => {
                setPronouns(e.target.value);
                let profile = props.user.profile || {};
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
            <TextField
              id="title"
              label="Title / What do you do?"
              variant="outlined"
              fullWidth
              style={{ margin: "15px auto" }}
              helperText="For example, 'VP of Engineering'"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{titleLoading}</InputAdornment>
                ),
              }}
              value={title || (props.user && props.user?.profile?.title) || ""}
              onChange={async (e) => {
                setTitle(e.target.value);
                let profile = props.user.profile || {};
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
            <TextField
              id="bio"
              label="Bio / Fun Fact / Something Extra"
              multiline
              rows={4}
              style={{ margin: "15px auto" }}
              helperText="Add whatever you'd like here, we'll show it to folks once they guess."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{bioLoading}</InputAdornment>
                ),
              }}
              value={bio || (props.user && props.user?.profile?.bio) || ""}
              onChange={async (e) => {
                setBio(e.target.value);
                let profile = props.user.profile || {};
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
          </Paper>
        </Box>
        <Box style={{ width: "60%", padding: 20, display: "inline-block" }}>
          <Paper style={{ padding: 10, textAlign: "left" }}>
            <Box style={{ fontSize: 24, fontWeight: "bold" }}>
              {"Here's what to do"}
            </Box>
            <Box
              style={{
                margin: "10px 0px",
                border: "solid #eee 2px",
                borderRadius: 10,
                display: "flex",
              }}
            >
              <Box
                style={{
                  width: "60%",
                  borderRight: "solid #eee 2px",
                  padding: 10,
                }}
              >
                <Box
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    display: "flex",
                  }}
                >
                  <LoopIcon
                    sx={{ fontSize: 24 }}
                    style={{ marginRight: 5, cursor: "pointer" }}
                    onClick={() => {
                      setPromptId(Math.floor(Math.random() * prompts.length));
                    }}
                  />
                  <Box>{"Answer this..."}</Box>
                </Box>
                <Box
                  style={{
                    padding: 5,
                    paddingTop: 15,
                    color: "#1565c0",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {prompts[promptId].prompt}
                </Box>
                <Box style={{ padding: 5, fontStyle: "italic" }}>
                  {prompts[promptId].description}
                </Box>
              </Box>
              <Box style={{ width: "39%" }}>
                <Box
                  style={{
                    padding: 10,
                  }}
                >
                  <Box
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    {"Tips"}
                  </Box>
                  <Box>{"👍 15-60 seconds"}</Box>
                  <Box>{"👍 'Camera Only' video"}</Box>
                  <Box>
                    {"👎 Do "}
                    <b>NOT</b>
                    {
                      " say your name - folks will be guessing that based on your video!"
                    }
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* <Button
              variant="contained"
              style={{
                width: "100%",
                height: 40,
                fontSize: 24,
                textTransform: "none",
                textAlign: "left",
              }}
              endIcon={<LoopIcon sx={{ fontSize: 40 }} />}
            >
              {prompts[0].prompt}
            </Button> */}
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
              Record
            </Button>
            <Box
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              {`${
                props.user?.profile?.recordings?.length || 0
              }/5 Saved Recordings`}
            </Box>
            <Box>
              {props.user?.profile?.recordings &&
                props.user.profile.recordings.map((r) => {
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
            {/* <Flicking circular={true} plugins={[new Arrow()]}>
              <div className="card-panel">1</div>
              <div className="card-panel">2</div>
              <div className="card-panel">3</div>
              <ViewportSlot>
                <span className="flicking-arrow-prev"></span>
                <span className="flicking-arrow-next"></span>
              </ViewportSlot>
            </Flicking> */}
            {/* <div dangerouslySetInnerHTML={{ __html: videoHTML }}></div> */}
          </Paper>
        </Box>
        {/* <button id={BUTTON_ID}>Record</button> */}
      </div>
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
