<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    onMount(() => {
        goto("/about/general", { replaceState: true });
    });
</script>

<p>Redirecting…</p>
