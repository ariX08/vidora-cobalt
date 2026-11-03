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

/** Force a download / open using an invisible <a> element */
export const forceDownload = (url: string, filename?: string) => {
    if (!['http:', 'https:'].includes(new URL(url).protocol)) {
        return alert('error: invalid url!');
    }

    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    if (filename) {
        a.download = filename;
    } else {
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

    // Always show the dialog when preference is "ask"
    if (pref === "ask") {
        return openSavingDialog({ url, file, urlType });
    }

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
            const iosFileShareSizeLimit = 1024 * 1024 * 256;

            if (device.is.iOS) {
                if (file.size < iosFileShareSizeLimit) {
                    shareFile(file);
                } else {
                    openFile(file);
                }
            } else if (pref === "share" && device.supports.share) {
                shareFile(file);
            } else if (pref === "download") {
                openFile(file);
            }

            // Always show dialog after action so user still has options
            return openSavingDialog({ url, file, urlType });
        }

        if (url) {
            if (pref === "share" && device.supports.share) {
                shareURL(url);
            } else if (pref === "download" && device.supports.directDownload
                    && !(device.is.iOS && urlType === "redirect")) {
                forceDownload(url);
            } else if (pref === "copy" && !file) {
                copyURL(url);
            }

            // Always show the dialog after opening the media
            return openSavingDialog({ url, file, urlType });
        }
    } catch { /* catch & ignore */ }

    return openSavingDialog({ url, file, urlType });
}
