import { get } from "svelte/store";
import { t } from "$lib/i18n/translations";
import { downloadFile } from "$lib/download";
import { createDialog } from "$lib/state/dialogs";
import { downloadButtonState } from "$lib/state/omnibox";
import settings from "$lib/state/settings";

const YT_API = "https://vidora-api-ey1k.onrender.com";

const isYouTube = (url: string) =>
  /(?:youtube\.com|youtu\.be)/i.test(url);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function handleYouTube(url: string): Promise<boolean> {
  if (!isYouTube(url)) return false;

  downloadButtonState.set("think");

  const error = (msg: string) => {
    downloadButtonState.set("error");
    createDialog({
      id: "save-error",
      type: "small",
      meowbalt: "error",
      buttons: [
        {
          text: get(t)("button.gotit"),
          main: true,
          action: () => {},
        },
      ],
      bodyText: msg,
    });
    return true;
  };

  try {
    const saveSettings = get(settings).save;
    const type =
      saveSettings.downloadMode === "audio" ? "audio" : "video";

    let quality = "best";
    if (type === "video") {
      const q = String(saveSettings.videoQuality || "1080");
      if (["360", "480", "720", "1080"].includes(q)) {
        quality = `${q}p`;
      }
    }

    const startRes = await fetch(`${YT_API}/api/download`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, type, quality }),
    });

    if (!startRes.ok) {
      const err = await startRes.json().catch(() => ({}));
      return error(err?.error || "Failed to start YouTube download");
    }

    const { jobId } = await startRes.json();
    if (!jobId) return error("No job ID returned from YouTube API");

    downloadButtonState.set("check");

    let attempts = 0;
    const maxAttempts = 120;

    while (attempts < maxAttempts) {
      await sleep(2000);
      attempts++;

      const statusRes = await fetch(`${YT_API}/api/job/${jobId}`);
      if (!statusRes.ok) continue;

      const job = await statusRes.json();

      if (job.status === "failed") {
        return error(job.error || "YouTube download failed");
      }

      if (job.status === "completed") {
        downloadButtonState.set("done");

        const fileUrl = `${YT_API}/api/file/${jobId}`;

        await downloadFile({
          url: fileUrl,
          urlType: "redirect",
        });

        return true;
      }
    }

    return error("YouTube download timed out. Please try again.");
  } catch (e: any) {
    console.error("YouTube handler error:", e);
    return error(
      e?.message || "Something went wrong while downloading from YouTube"
    );
  }
}

export { isYouTube };
