import Head from "next/head";

import { setup, isSupported } from "@loomhq/loom-sdk";
import { oembed } from "@loomhq/loom-embed";
import { useEffect, useState } from "react";

const API_KEY = "68b7bc76-7a37-44a0-82dd-9ed12a18d467";
const BUTTON_ID = "loom-sdk-button";

export default function Record() {
  const [videoHTML, setVideoHTML] = useState("");

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
        console.log(video.sharedUrl);
        const { html } = await oembed(video.sharedUrl, { width: 400 });
        setVideoHTML(html);
      });
    }

    setupLoom();
  }, []);

  return (
    <>
      <Head>
        <title>Record</title>
      </Head>
      <h1>Start Recording</h1>
      <button id={BUTTON_ID}>Record</button>
      <div dangerouslySetInnerHTML={{ __html: videoHTML }}></div>
    </>
  );
}
