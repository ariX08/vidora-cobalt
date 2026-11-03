<script lang="ts">
    import dialogs from "$lib/state/dialogs";

    import SmallDialog from "$components/dialog/SmallDialog.svelte";
    import PickerDialog from "$components/dialog/PickerDialog.svelte";
    import SavingDialog from "$components/dialog/SavingDialog.svelte";
    import NoScriptDialog from "$components/dialog/NoScriptDialog.svelte";

    $: backdropVisible = $dialogs.length > 0;
</script>

<div id="dialog-holder">
    <NoScriptDialog />
    {#each $dialogs as dialog}
        {#if dialog.type === "small"}
            <SmallDialog {...dialog} />
        {:else if dialog.type === "picker"}
            <PickerDialog {...dialog} />
        {:else if dialog.type === "saving"}
            <SavingDialog {...dialog} />
        {/if}
    {/each}
    <div id="dialog-backdrop" class:visible={backdropVisible}></div>
</div>

<style>
    :global(dialog) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: none;

        max-height: 100%;
        max-width: 100%;
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        border: none;
        pointer-events: all;

        inset-inline-start: unset;
        inset-inline-end: unset;

        overflow: hidden;
    }

    :global(dialog:modal) {
        inset-block-start: 0;
        inset-block-end: 0;
    }

    :global(dialog:modal::backdrop) {
        display: none;
    }

    #dialog-holder {
        position: fixed;
        padding-top: env(safe-area-inset-top);
        height: 100%;
        width: 100%;
        z-index: 99;

        display: flex;
        justify-content: center;
        align-items: center;

        pointer-events: none;
    }

    #dialog-backdrop, :global(#nojs-dialog-backdrop) {
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: -1;

        background-color: var(--dialog-backdrop);

        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);

        opacity: 0;

        will-change: opacity;
        transition: opacity 0.25s ease;
    }

    #dialog-backdrop.visible {
        opacity: 1;
    }

    :global([data-reduce-transparency="true"]) #dialog-backdrop {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
    }

    :global(.dialog-body) {
        --dialog-padding: 20px;

        display: flex;
        flex-direction: column;
        align-items: center;

        background: var(--popup-bg);
        border: 1px solid var(--popup-stroke);
        border-radius: 24px;
        box-shadow: var(--glass-shadow);

        padding: var(--dialog-padding);

        position: relative;
        will-change: transform, opacity;
    }

    :global(dialog.open .dialog-body) {
        animation: modal-in 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        animation-delay: 0.04s;
        animation-fill-mode: backwards;
    }

    :global(dialog.closing .dialog-body) {
        animation: modal-out 0.18s ease;
        opacity: 0;
    }

    @media screen and (max-width: 535px) {
        :global(dialog) {
            justify-content: flex-end;
        }

        :global(dialog.open .dialog-body) {
            animation: modal-in-mobile 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        :global(dialog .dialog-body) {
            margin-bottom: calc(
                var(--padding) + calc(
                    env(safe-area-inset-bottom) - 15px * sign(
                        env(safe-area-inset-bottom)
                    )
                )
            ) !important;
        }
    }

    @keyframes modal-in {
        from {
            transform: scale(0.92);
            opacity: 0;
        }
        40% {
            opacity: 1;
        }
        70% {
            transform: scale(1.01);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes modal-out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
            transform: scale(0.94);
            visibility: hidden;
        }
    }

    @keyframes modal-in-mobile {
        0% {
            transform: translateY(0);
            opacity: 0;
        }
        1% {
            transform: translateY(180px);
        }
        40% {
            opacity: 1;
        }
        70% {
            transform: translateY(-4px);
        }
        100% {
            transform: translateY(0px);
        }
    }
</style>
