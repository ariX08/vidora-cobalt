import * as _env from "$env/static/public";

const getEnv = (_key: string) => {
    const env = _env as Record<string, string | undefined>;
    const key = `WEB_${_key}`;

    if (key in env) {
        return env[key];
    }
}

const getEnvBool = (key: string) => {
    const value = getEnv(key);
    return value && ['1', 'true'].includes(value.toLowerCase());
}

const variables = {
    HOST: getEnv('HOST'),
    PLAUSIBLE_HOST: getEnv('PLAUSIBLE_HOST'),
    PLAUSIBLE_ENABLED: getEnv('HOST') && getEnv('PLAUSIBLE_HOST'),
    DEFAULT_API: getEnv('DEFAULT_API'),
    ENABLE_WEBCODECS: getEnvBool('ENABLE_WEBCODECS'),
    ENABLE_DEPRECATED_YOUTUBE_HLS: getEnvBool('ENABLE_DEPRECATED_YOUTUBE_HLS'),
}

const contacts = {
    discord: "",
    twitter: "",
    github: "https://github.com/ariX08/vidora-cobalt",
    bluesky: "",
    telegram_ru: "",
}

const partners = {
    royalehosting: "",
}

const donate = {
    stripe: "",
    liberapay: "",
    crypto: {
        ethereum: "",
        monero: "",
        solana: "",
        litecoin: "",
        bitcoin: "",
        ton: "",
    },
    other: {
        boosty: "",
    }
};

const siriShortcuts = {
    photos: "",
    files: "",
};

const docs = {
    instanceHosting: "https://github.com/ariX08/vidora-cobalt/blob/main/docs/run-an-instance.md",
    webLicense: "https://github.com/ariX08/vidora-cobalt/blob/main/web/LICENSE",
    apiLicense: "https://github.com/ariX08/vidora-cobalt/blob/main/api/LICENSE",
};

const officialApiURL = "https://api.cobalt.tools";

export { donate, officialApiURL, contacts, partners, siriShortcuts, docs };
export default variables;
