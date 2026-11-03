import { get } from "svelte/store";

import settings from "$lib/state/settings";

import { device } from "$lib/device";
import { t } from "$lib/i18n/translations";
import { createDialog } from "$lib/state/dialogs";

import type { DialogInfo } from "$lib/types/dialog";
import type { CobaltFileUrlType } from "$lib/types/api";

type DownloadFileParams = {
    url?: string,
    file?: File,
    urlType?: CobaltFileUrlType,
}

type SavingDialogParams = {
    url?: string,
    file?: File,
    body?: string,
    urlType?: CobaltFileUrlType,
}

const openSavingDialog = ({ url, file, body, urlType }: SavingDialogParams) => {
    const dialogData: DialogInfo = {
        type: "saving",
        id: "saving",
        file,
        url,
        urlType,
    }
    if (body) dialogData.bodyText = body;

    createDialog(dialogData)
}

export const openFile = (file: File) => {
    const a = document.createElement("a");
    const url = URL.createObjectURL(file);

    a.href = url;
    a.download = file.name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export const shareFile = async (file: File) => {
    return await navigator?.share({
        files: [ file ],
    });
}

/** Force a download using an invisible <a> element (much more reliable than window.open) */
export const forceDownload = (url: string, filename?: string) => {
    if (!['http:', 'https:'].includes(new URL(url).protocol)) {
        return alert('error: invalid url!');
    }

    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    // Try to force download when possible
    if (filename) {
        a.download = filename;
    } else {
        // Extract a reasonable filename from the URL if possible
        try {
            const pathname = new URL(url).pathname;
            const name = pathname.split("/").pop();
            if (name && name.includes(".")) {
                a.download = name;
            }
        } catch {}
    }

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export const openURL = (url: string, hasDialog = false) => {
    // Prefer forceDownload over window.open — browsers block window.open very often
    forceDownload(url);
}

export const shareURL = async (url: string) => {
    return await navigator?.share({ url });
}

export const copyURL = async (url: string) => {
    return await navigator?.clipboard?.writeText(url);
}

export const downloadFile = ({ url, file, urlType }: DownloadFileParams) => {
    if (!url && !file) throw new Error("attempted to download void");

    const pref = get(settings).save.savingMethod;

    if (pref === "ask") {
        return openSavingDialog({ url, file, urlType });
    }

    /*
        user actions (such as invoke share, open new tab) have expiration.
        in webkit, for example, that timeout is 5 seconds.
        https://github.com/WebKit/WebKit/blob/b838f8bb/Source/WebCore/page/LocalDOMWindow.cpp#L167

        navigator.userActivation.isActive makes sure that we're still able to
        invoke an action without the user agent interrupting it.
        if not, we show a saving dialog for user to re-invoke that action.

        if browser is old or doesn't support this API, we just assume that it expired.
    */
    if (!navigator?.userActivation?.isActive) {
        return openSavingDialog({
            url,
            file,
            body: get(t)("dialog.saving.timeout"),
            urlType
        });
    }

    try {
        if (file) {
            // 256mb cuz ram limit per tab is 384mb,
            // and other stuff (such as libav) might have used some ram too
            const iosFileShareSizeLimit = 1024 * 1024 * 256;

            // this is required because we can't share big files
            // on ios due to a very low ram limit
            if (device.is.iOS) {
                if (file.size < iosFileShareSizeLimit) {
                    return shareFile(file);
                } else {
                    return openFile(file);
                }
            }

            if (pref === "share" && device.supports.share) {
                return shareFile(file);
            } else if (pref === "download") {
                return openFile(file);
            }
        }

        if (url) {
            if (pref === "share" && device.supports.share) {
                return shareURL(url);
            } else if (pref === "download" && device.supports.directDownload
                    && !(device.is.iOS && urlType === "redirect")) {
                return forceDownload(url);   // ← changed from openURL
            } else if (pref === "copy" && !file) {
                return copyURL(url);
            }
        }
    } catch { /* catch & ignore */ }

    return openSavingDialog({ url, file, urlType });
}
