import { Box, Button } from "@mui/material";

import { useRouter } from "next/router";
import Link from "next/link";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import firebase from "../firebase/clientApp"; // Initializes Firebase
import { getAuth } from "firebase/auth";

function Shaun() {
  const auth = getAuth();
  const router = useRouter();

  return (
    <Box style={{ margin: "0 auto", width: 600 }}>
      <h2>{`Hey, I'm Shaun 👋`}</h2>

      <h3>{`About Me`}</h3>
      <Box
        style={{ marginBottom: 30 }}
      >{`First and foremost, I love to build. I build web apps like WhoDat for fun and to keep up to date on 
      the latest and greatest web technologies.`}</Box>
      <Box
        style={{ marginBottom: 30 }}
      >{`What I love more than about anything are APIs and connecting things together. Whether that's Slack, 
      Internal Tools, Salesforce, or any other service in between, I think integrations can and should spark joy. 
      Being a self-proclaimed "Extreme Power User" of products is something I pride myself on.`}</Box>

      <h3>{`What I am doing right now`}</h3>
      <Box style={{ marginBottom: 30 }}>
        {`For the last two years, I have been leading the Field Engineering team at `}
        <a
          style={{ color: "#1976d2" }}
          href="https://www.scale.com/"
          target="_blank"
          rel="noreferrer"
        >
          Scale AI
        </a>
        .
      </Box>
      <Box style={{ marginBottom: 30 }}>
        {`Field Engineering is responsible for our customer's technical success, covering things from the SDK and Docs, 
        to API troubleshooting and custom scripts.`}
      </Box>
      <Box style={{ marginBottom: 30 }}>
        {`The biggest thing we focus on, though, is how to automate ourselves out of a job. This often means building process,
        internal tools, and even more documentation - investing today to move faster tomorrow.`}
      </Box>

      <h3>{`Where to find me?`}</h3>
      <Box style={{ marginBottom: 30 }}>
        {`The best way to connect with me is on `}
        <a
          style={{ color: "#1976d2" }}
          href="https://www.linkedin.com/in/svanweelden/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
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
  );
}

export default Shaun;
