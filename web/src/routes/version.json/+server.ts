import { json } from "@sveltejs/kit";
import { getCommit, getBranch, getRemote, getVersion } from "@imput/version-info";

export async function GET() {
    let commit = "unknown";
    let branch = "unknown";
    let remote = "unknown";
    let version = "unknown";

    try {
        commit = await getCommit();
    } catch {}
    try {
        branch = await getBranch();
    } catch {}
    try {
        remote = await getRemote();
    } catch {}
    try {
        version = await getVersion();
    } catch {}

    return json({
        commit,
        branch,
        remote,
        version
    });
}

export const prerender = true;
