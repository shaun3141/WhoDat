import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta
            name="description"
            content="Avoid awkward encounters at the office with WhoDat. Can you recognize your co-workers and guess who they are to earn a spot on the leaderboard?"
          ></meta>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff"></meta>
          {/* OpenGraph Tags */}
          <meta
            property="og:title"
            content="Avoid Awkward Work Encounters with WhoDat"
          />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="WhoDat" />
          <meta property="og:url" content="https://whodat.app/" />
          <meta
            property="og:image"
            content="https://whodat.app/WhoDat_OG_Image.jpg"
          />
          <meta name="twitter:card" content="summary_large_image"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
