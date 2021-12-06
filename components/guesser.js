import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Box, Button } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

import firebase from "../firebase/clientApp";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import LoadingSpinner from "./loadingSpinner";

export default function Guesser(props) {
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [recordingId, setRecordingId] = useState(0);
  const [userNumber, setUserNumber] = useState(0);
  const [guess, setGuess] = useState(null);
  const [guessedCorrect, setGuessedCorrect] = useState(null);
  const [errorOccurred, setErrorOccured] = useState(null);

  const NUM_LOSE_GIFS = 16;
  const NUM_WON_GIFS = 20;

  useEffect(() => {
    setupGame();
  }, []);

  function setupGame() {
    const tempList = (props.allUsers || []).filter(
      (u) => u?.profile?.recordings?.length
    );

    // https://stackoverflow.com/a/12646864
    shuffleArray(tempList);
    setFilteredUserList(tempList);
    setRecordingId(
      tempList.length &&
        Math.floor(Math.random() * tempList[0].profile.recordings.length)
    );
    setUserNumber(0);
    setGuess(null);
    setGuessedCorrect(null);
  }

  return (
    <>
      <Box style={{ textAlign: "center" }}>
        <Box
          style={{
            width: "100%",
            maxWidth: "500px",
            display: "inline-block",
            height: "45px",
          }}
        >
          <h2 style={{ float: "left" }}>Who is dat? 🤔</h2>
          <h2 style={{ float: "right" }}>
            Score: <span style={{ color: "#1976d2" }}>{userNumber}</span>
          </h2>
        </Box>
      </Box>
      {filteredUserList.length ? (
        <Box style={{ textAlign: "center" }}>
          {filteredUserList && (
            <>
              {guessedCorrect || guessedCorrect === null ? (
                userNumber < filteredUserList.length ? (
                  <>
                    <RecordingDisplay
                      recording={
                        filteredUserList[userNumber].profile.recordings[
                          recordingId
                        ]
                      }
                    />
                    <Box style={{ display: "flex", justifyContent: "center" }}>
                      <Autocomplete
                        id="highlights-demo"
                        key={new Date()} // Force a re-render as often as we can :sweat-smile:
                        sx={{ width: 300 }}
                        options={filteredUserList}
                        getOptionLabel={(option) => option.profile.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Guess who it is!"
                            margin="normal"
                          />
                        )}
                        renderOption={(props, option, { inputValue }) => {
                          const matches = match(
                            option.profile.name,
                            inputValue
                          );
                          const parts = parse(option.profile.name, matches);

                          return (
                            <li {...props}>
                              <div>
                                {parts.map((part, index) => (
                                  <span
                                    key={index}
                                    style={{
                                      fontWeight: part.highlight ? 700 : 400,
                                    }}
                                  >
                                    {part.text}
                                  </span>
                                ))}
                              </div>
                            </li>
                          );
                        }}
                        value={guess}
                        onChange={async (e, val) => {
                          setGuess(null);
                          if (
                            val &&
                            val.uid === filteredUserList[userNumber].uid
                          ) {
                            console.log("You guessed right!!");
                            setUserNumber(userNumber + 1);
                            setRecordingId(
                              filteredUserList.length &&
                                Math.floor(
                                  Math.random() *
                                    filteredUserList[
                                      Math.min(
                                        userNumber + 1,
                                        filteredUserList.length - 1
                                      )
                                    ].profile.recordings.length
                                )
                            );
                            setGuessedCorrect(true);
                            if (
                              !props.user?.profile?.score ||
                              props.user.profile.score < userNumber + 1
                            )
                              try {
                                await updateDoc(
                                  doc(props.store, "users", props.user.uid),
                                  {
                                    profile: {
                                      ...(props.user?.profile || {}),
                                      score:
                                        (props.user?.profile?.score || 0) + 1,
                                    },
                                  }
                                );
                              } catch (e) {
                                console.error("Error updating document: ", e);
                                setErrorOccured(true);
                              }
                          } else {
                            // Lose game
                            setGuessedCorrect(false);
                          }
                        }}
                      />
                      <Button
                        variant="contained"
                        style={{ height: "50px", margin: "18px" }}
                        onClick={() => {
                          setGuessedCorrect(false);
                        }}
                      >
                        {`No Idea `}
                        <span style={{ fontSize: "2em", paddingLeft: 10 }}>{` ${
                          ["😭", "😢", "😞", "🥺", "😩", "😵‍💫"][
                            Math.floor(Math.random() * 6)
                          ]
                        }`}</span>
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box style={{ fontSize: "1.2em", padding: 10 }}>
                      {"Awesome "}
                      <span style={{ fontSize: "1.2em" }}>🎉</span>
                      {" You guessed everyone!"}
                    </Box>
                    <Box
                      style={{
                        width: "100%",
                        height: 300,
                        position: "relative",
                      }}
                    >
                      <Image
                        src={`/endGameGifs/Win${Math.ceil(
                          Math.random() * NUM_WON_GIFS
                        )}.gif`}
                        alt="Great job!"
                        layout="fill"
                        objectFit="contain"
                      />
                    </Box>
                    <Button
                      variant="contained"
                      style={{ marginTop: 20, marginBottom: 10 }}
                      endIcon={<ReplayIcon />}
                      onClick={() => setupGame()}
                    >
                      Play Again
                    </Button>
                  </>
                )
              ) : (
                <>
                  <Box style={{ fontSize: "1.2em", padding: 10 }}>
                    {"Oh no! "}
                    <span style={{ fontSize: "1.2em" }}>😕</span>
                    {" Better luck next time..."}
                  </Box>
                  <Box
                    style={{ width: "100%", height: 300, position: "relative" }}
                  >
                    <Image
                      src={`/endGameGifs/Lose${Math.ceil(
                        Math.random() * NUM_LOSE_GIFS
                      )}.gif`}
                      alt="Try again!"
                      layout="fill"
                      objectFit="contain"
                    />
                  </Box>
                  <Button
                    variant="contained"
                    style={{ marginTop: 20, marginBottom: 10 }}
                    endIcon={<ReplayIcon />}
                    onClick={() => setupGame()}
                  >
                    Play Again
                  </Button>
                </>
              )}
              <Box>
                {guessedCorrect !== null && (
                  <GuessResult
                    user={filteredUserList[userNumber > 0 ? userNumber - 1 : 0]}
                    guessedCorrect={guessedCorrect}
                  />
                )}
              </Box>
            </>
          )}
        </Box>
      ) : (
        <>
          <Box
            style={{
              width: "100%",
              height: 300,
              position: "relative",
              marginTop: 30,
            }}
          >
            <Image
              src={`/NoRecordingsYet.gif`}
              alt="Try again!"
              layout="fill"
              objectFit="contain"
            />
          </Box>
          <Box
            style={{
              textAlign: "center",
              fontSize: "1.4em",
              marginTop: "30px",
            }}
          >
            <Box style={{ fontWeight: "bold" }}>
              Wait a second, no one has recorded anything yet!
            </Box>
            <Box style={{ marginTop: 20 }}>
              You should{" "}
              <Link href="/me" passHref={true}>
                <>
                  <span style={{ color: "#1976d2", cursor: "pointer" }}>
                    set up your profile
                  </span>
                  <span>.</span>
                </>
              </Link>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

function RecordingDisplay(props) {
  return props.recording ? (
    <>
      <Box>
        <h3>{props.recording.prompt}</h3>
      </Box>
      <Box style={{ margin: 10, padding: 10, marginTop: -25 }}>
        <i>{props.recording.description}</i>
      </Box>
      <Box
        style={{ textAlign: "center" }}
        dangerouslySetInnerHTML={{
          __html: props.recording.videoHTML,
        }}
      ></Box>
    </>
  ) : null;
}

function GuessResult(props) {
  return (
    <Box
      style={{
        padding: 5,
        border: "1px solid #ddd",
        maxWidth: 500,
        margin: "10px auto",
        borderRadius: 5,
      }}
    >
      <Box style={{ padding: 5 }}>
        {props.guessedCorrect ? "Amazing, that's right!" : "Shoot, that's OK."}
      </Box>
      <Box>
        <Box style={{ padding: 5 }}>
          That was <b>{props.user.profile.name}</b>
          {props.user.profile.nickname ? (
            <span>
              {`, who goes by `}
              <b>{`${props.user.profile.nickname}`}</b>
            </span>
          ) : (
            ""
          )}
        </Box>
        <Box style={{ padding: 5 }}>
          {props.user.profile.title ? (
            <span>
              <b>Title:</b>
              {` ${props.user.profile.title}`}
            </span>
          ) : (
            ""
          )}
          {props.user.profile.title && props.user.profile.pronouns ? " | " : ""}
          {props.user.profile.pronouns ? (
            <span>
              <b>Pronouns:</b>
              {` ${props.user.profile.pronouns}`}
            </span>
          ) : (
            ""
          )}
        </Box>
        {props.user.profile.bio && (
          <Box>
            <Box style={{ padding: 5 }}>
              <b>Bio</b>
            </Box>
            <Box style={{ padding: 5 }}>
              <i>{props.user.profile.bio}</i>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
