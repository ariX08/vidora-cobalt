<script lang="ts">
    import { t } from "$lib/i18n/translations";
</script>

<svelte:head>
    <title>
        {$t("tabs.donate")} ~ {$t("general.cobalt")}
    </title>
    <meta
        property="og:title"
        content="{$t("tabs.donate")} ~ {$t("general.cobalt")}"
    />
</svelte:head>

<div id="donate-page-wrapper">
    <main id="donate-page">
        <!-- Put your donate image here: web/static/donate.webp -->
        <img
            id="donate-image"
            src="/donate.webp"
            alt="Donate"
            width="720"
            height="720"
        />
    </main>
</div>

<style>
    #donate-page-wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        padding: var(--padding);
    }

    #donate-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        max-width: 100%;
        width: 720px;
    }

    #donate-image {
        width: 100%;
        max-width: 560px;
        height: auto;
        object-fit: contain;
        border-radius: 16px;
        user-select: none;
        pointer-events: none;
    }
</style>
