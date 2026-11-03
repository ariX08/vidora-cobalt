import env from "$lib/env";
import { get } from "svelte/store";
import settings from "$lib/state/settings";

export const currentApiURL = () => {
    const processingSettings = get(settings).processing;
    const customInstanceURL = processingSettings.customInstanceURL;

    let raw: string;
    if (processingSettings.enableCustomInstances && customInstanceURL.length > 0) {
        raw = customInstanceURL;
    } else {
        raw = env.DEFAULT_API!;
    }

    const url = new URL(raw);
    // Preserve pathname so path-prefixed deployments (e.g. /api) work.
    // Strip trailing slash for consistent joining of /session, /tunnel, etc.
    let base = url.origin + url.pathname;
    if (base.endsWith("/")) {
        base = base.slice(0, -1);
    }
    return base;
}
