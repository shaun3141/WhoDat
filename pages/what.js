import Link from "next/link";
import Head from "next/head";

import { Box } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

function Shaun() {
  return (
    <>
      <Head>
        <title>WhoDat | What is WhoDat</title>
      </Head>
      <Box style={{ margin: "0 auto", width: 600 }}>
        <h2>{`So what's WhoDat? 🤔`}</h2>

        <h3>{`The Project`}</h3>
        <Box
          style={{ marginBottom: 30 }}
        >{`As folks return to the office, I never really get tired of seeing someone I've worked with for 
      the past 18 months in person the very first time.`}</Box>
        <Box
          style={{ marginBottom: 30 }}
        >{`As fun as those encounters are, I realized there are SO many people I still don't know at the office. 
      WhoDat is basically fun flashcards to get to know your co-workers and their faces a bit better to 
      prepare for in-person meetings + maybe to spark a conversation.`}</Box>
        <Box
          style={{ marginBottom: 30 }}
        >{`When the people team plans that next in-person happy hour, WhoDat players will be ready!`}</Box>

        <h3>{`LoomSDK Holiday Hackathon`}</h3>
        <Box style={{ marginBottom: 30 }}>
          {`WhoDat was largely built for `}
          <a
            style={{ color: "#1976d2" }}
            href="https://loomsdkholidayhack2021.devpost.com/"
            target="_blank"
            rel="noreferrer"
          >
            {`Loom's Holiday Hackathon`}
          </a>
          .
        </Box>
        <Box style={{ marginBottom: 30 }}>
          {`Loom is one of my favorite SaaS companies today, I love the asynchronous communication Loom facilitates.
        One of the tag lines of Loom is "Say it faster with Video" and that definitely comes true for me.`}
        </Box>

        <h3>{`Technical Details`}</h3>
        <Box style={{ marginBottom: 30 }}>
          {`This project uses the following technologies:`}
          <ul>
            <li>
              <a
                style={{ color: "#1976d2" }}
                href="https://nextjs.org/"
                target="_blank"
                rel="noreferrer"
              >
                Next.js (React + Node based Web Framework)
              </a>
            </li>
            <li>
              <a
                style={{ color: "#1976d2" }}
                href="https://firebase.google.com/"
                target="_blank"
                rel="noreferrer"
              >
                Firebase (Realtime Database)
              </a>
            </li>
            <li>
              <a
                style={{ color: "#1976d2" }}
                href="https://mui.com/"
                target="_blank"
                rel="noreferrer"
              >
                Material UI (React Component Library)
              </a>
            </li>
          </ul>
        </Box>
        <Box style={{ marginBottom: 30 }}>
          {`You can find this project's source code on `}
          <a
            style={{ color: "#1976d2" }}
            href="https://github.com/shaun3141/WhoDat"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          .
        </Box>
        <Link href="/" passHref={true}>
          <span style={{ color: "#1976d2", cursor: "pointer" }}>
            <KeyboardReturnIcon
              // sx={{ fontSize: 24 }}
              style={{
                fontSize: "20px",
                paddingTop: "5px",
                marginBottom: "-3px",
              }}
            />
            Back to WhoDat
          </span>
        </Link>
      </Box>
    </>
  );
}

export default Shaun;
