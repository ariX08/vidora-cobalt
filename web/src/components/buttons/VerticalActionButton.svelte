<script lang="ts">
    export let id: string;
    export let click = () => {
        alert("no function assigned");
    };
    export let fill = false;
    export let elevated = false;
    export let ariaLabel = "";
</script>

<button
    id="button-{id}"
    class="button vertical"
    class:fill
    class:elevated
    on:click={click}
    aria-label={ariaLabel}
>
    <slot></slot>
</button>

<style>
    .button.vertical {
        flex-direction: column;
        line-height: 1;
        padding: 14px 12px;
        gap: 8px;
        font-size: 13px;
        letter-spacing: -0.01em;
    }

    .button.vertical :global(svg) {
        width: 22px;
        height: 22px;
        stroke-width: 1.7px;
        color: var(--secondary);
    }

    .button.vertical.fill {
        width: 100%;
        padding: 14px 0;
    }
</style>
