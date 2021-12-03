import { useEffect, useState } from "react";

import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

import LoadingSpinner from "./loadingSpinner";

export default function Guesser(props) {
  console.log(filteredUserList);

  const [filteredUserList, setFilteredUserList] = useState([]);
  const [recordingId, setRecordingId] = useState(0);
  const [userNumber, setUserNumber] = useState(0);
  const [guess, setGuess] = useState(null);
  const [guessedCorrect, setGuessedCorrect] = useState(null);

  useEffect(() => {
    console.log("IN use effect..");
    const tempList = (props.allUsers || []).filter(
      (u) => u?.profile?.recordings?.length
    );

    // https://stackoverflow.com/a/12646864
    shuffleArray(tempList);
    setFilteredUserList(tempList);

    console.log(tempList);

    setRecordingId(
      tempList.length &&
        Math.floor(
          Math.random() * tempList[userNumber].profile.recordings.length
        )
    );
  }, []);

  return (
    <>
      {filteredUserList.length ? (
        <Box style={{ textAlign: "center" }}>
          <h2>
            Who is dat? 🤔 | Score:{" "}
            <span style={{ color: "#1976d2" }}>{userNumber}</span>
          </h2>
          {filteredUserList && (
            <>
              {userNumber < filteredUserList.length ? (
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
                        const matches = match(option.profile.name, inputValue);
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
                          console.log("You win!!");
                          setUserNumber(userNumber + 1);
                          setRecordingId(
                            filteredUserList.length &&
                              Math.floor(
                                Math.random() *
                                  filteredUserList[userNumber].profile
                                    .recordings.length
                              )
                          );
                          setGuessedCorrect(true);
                        } else {
                          setGuessedCorrect(false);
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      style={{ height: "50px", margin: "18px" }}
                    >
                      {`No Idea `}
                      <span style={{ fontSize: "2em", paddingLeft: 10 }}>{` ${
                        ["😭", "😢", "😞", "🥺", "😩", "😵‍💫"][
                          Math.floor(Math.random() * 6)
                        ]
                      }`}</span>
                    </Button>
                  </Box>
                  <Box>
                    {userNumber > 0 && (
                      <>
                        <Box style={{ padding: 5 }}>
                          {guessedCorrect
                            ? "Amazing, that's right!"
                            : "Shoot, that's OK. Take a good look now."}
                        </Box>
                        <Box>
                          <Box style={{ padding: 5 }}>
                            This is{" "}
                            <b>{filteredUserList[userNumber].profile.name}</b>
                            {filteredUserList[userNumber].profile.nickname ? (
                              <span>
                                {`, who goes by `}
                                <b>
                                  {`${filteredUserList[userNumber].profile.nickname}`}
                                </b>
                              </span>
                            ) : (
                              ""
                            )}
                          </Box>
                          <Box style={{ padding: 5 }}>
                            {filteredUserList[userNumber].profile.title ? (
                              <span>
                                <b>Title:</b>
                                {` ${filteredUserList[userNumber].profile.title}`}
                              </span>
                            ) : (
                              ""
                            )}
                            {filteredUserList[userNumber].profile.title &&
                            filteredUserList[userNumber].profile.pronouns
                              ? " | "
                              : ""}
                            {filteredUserList[userNumber].profile.pronouns ? (
                              <span>
                                <b>Pronouns:</b>
                                {` ${filteredUserList[userNumber].profile.pronouns}`}
                              </span>
                            ) : (
                              ""
                            )}
                          </Box>
                          {filteredUserList[userNumber].profile.bio && (
                            <Box>
                              <Box style={{ padding: 5 }}>
                                <b>Bio</b>
                              </Box>
                              <Box style={{ padding: 5 }}>
                                <i>
                                  {filteredUserList[userNumber].profile.bio}
                                </i>
                              </Box>
                            </Box>
                          )}
                        </Box>
                      </>
                    )}
                  </Box>
                </>
              ) : (
                <Box>{"Wow, you've won!"}</Box>
              )}
            </>
          )}
        </Box>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

function RecordingDisplay(props) {
  return (
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
  );
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
