import locale from "$lib/i18n/locale";
import { get } from "svelte/store";
import { error } from "@sveltejs/kit";
import { defaultLocale } from "$lib/i18n/translations";

import type { Component } from "svelte";
import type { PageLoad } from "./$types";
import type { DefaultImport } from "$lib/types/generic";

const ALLOWED = new Set(["general", "privacy", "terms"]);

const pages = import.meta.glob("$i18n/*/about/*.md");

export const load: PageLoad = async ({ params }) => {
    if (!ALLOWED.has(params.page)) {
        error(404, "Not found");
    }

    const getPage = (locale: string) => Object.keys(pages).find(
        file => file.endsWith(`${locale}/about/${params.page}.md`)
    );

    const componentPath = getPage(get(locale)) || getPage(defaultLocale);
    if (componentPath) {
        const componentImport = pages[componentPath] as DefaultImport<Component>;
        return { component: (await componentImport()).default }
    }

    error(404, "Not found");
};

export const prerender = true;
