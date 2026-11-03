<script>
    import { t } from "$lib/i18n/translations";

    import Omnibox from "$components/save/Omnibox.svelte";
    import SupportedServices from "$components/save/SupportedServices.svelte";
</script>

<svelte:head>
    <title>{$t("general.cobalt")}</title>
    <meta property="og:title" content={$t("general.cobalt")} />
</svelte:head>

<div id="vidora-save-container" class="center-column-container">
    <SupportedServices />
    <main
        id="vidora-save"
        tabindex="-1"
        data-first-focus
    >
        <img
            id="vidora-logo"
            src="/logo.webp"
            alt="Vidora"
            width="280"
            height="280"
        />
        <Omnibox />
    </main>
    <div id="terms-note">
        {$t("save.terms.note.agreement")}
        <a href="/about/terms">{$t("save.terms.note.link")}</a>
    </div>
</div>

<style>
    #vidora-save-container {
        padding: var(--padding);
        overflow: hidden;
    }

    #vidora-save {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        gap: 22px;
    }

    #vidora-logo {
        width: 240px;
        height: auto;
        max-width: 55vw;
        object-fit: contain;
        border-radius: 20px;
        user-select: none;
        pointer-events: none;
    }

    #terms-note {
        bottom: 0;
        color: var(--gray);
        font-size: 12.5px;
        text-align: center;
        padding-bottom: 8px;
        font-weight: 450;
        letter-spacing: -0.01em;
    }

    #terms-note a {
        color: var(--accent);
        text-decoration: none;
        font-weight: 500;
    }

    #terms-note a:hover {
        text-decoration: underline;
    }

    @media screen and (max-width: 535px) {
        #vidora-save-container {
            padding-top: calc(var(--padding) / 2);
        }

        #vidora-logo {
            width: 180px;
        }

        #terms-note {
            font-size: 11.5px;
            padding-bottom: 2px;
        }
    }
</style>
