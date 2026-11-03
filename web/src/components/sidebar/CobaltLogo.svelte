<div id="vidora-logo-sidebar">
    <img src="/brand-logo.png" alt="Vidora" width="36" height="36" />
</div>

<style>
    #vidora-logo-sidebar {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: calc(var(--sidebar-tab-padding) * 2);
        padding-bottom: calc(var(--sidebar-tab-padding) * 2 - var(--sidebar-inner-padding));
    }

    #vidora-logo-sidebar img {
        width: 36px;
        height: 36px;
        object-fit: contain;
        border-radius: 8px;
        user-select: none;
        pointer-events: none;
    }

    @media screen and (max-width: 535px) {
        #vidora-logo-sidebar {
            display: none;
        }
    }
</style>
