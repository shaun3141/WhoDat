import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>WhoDat</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {/* <Link href="/record">
            <a>Record</a>
          </Link> */}
          WhoDat
        </h1>
        <h2>Get ready to go back to the Office with WhoDat.</h2>
        <Image
          src="/whodat_placeholder.png"
          alt="WhoDat Cover"
          width={1000}
          height={600}
        />
        <p>
          {`WhoDat is a competitive game where you are shown short, fun videos of
your co-workers and must guess who they are to earn a spot on the
scoreboard`}
        </p>

        <div className={styles.grid}>
          <Box className={styles.card}>
            <Link href="/login" passHref className={styles.card}>
              <Box>
                <h2>Create a Game &rarr;</h2>
                <p>
                  {`Create a new WhoDat game for the office. It's free, easy, and
all about connections.`}
                </p>
              </Box>
            </Link>
          </Box>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>
              Not sure what the hype is all about? No worries, we will show you.
            </p>
          </a>

          <a href="https://www.loom.com" className={styles.card}>
            <h2>Loom &rarr;</h2>
            <p>
              Loom powers WhoDat - Loom records quick videos of your screen and
              cam.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Connect &rarr;</h2>
            <p>
              {`Learn about the project and connect with it's creator, Shaun VanWeelden`}
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          {`Made with 2 parts love, 1 part holiday spirit by Shaun VanWeelden`}
        </a>
      </footer>
    </div>
  );
}
