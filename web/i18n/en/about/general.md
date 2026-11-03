<script lang="ts">
    import { t } from "$lib/i18n/translations";
    import { contacts, docs } from "$lib/env";

    import SectionHeading from "$components/misc/SectionHeading.svelte";
</script>

<section id="summary">
<SectionHeading
    title={$t("about.heading.summary")}
    sectionId="summary"
/>

Vidora is a product by **Vidora INC.** that helps you save anything from your favorite websites: video, audio, photos or gifs. Just paste the link and you're ready to go.

No ads, trackers, paywalls, or other nonsense. Just a clean, fast tool that works anywhere, whenever you need it.
</section>

<section id="motivation">
<SectionHeading
    title={$t("about.heading.motivation")}
    sectionId="motivation"
/>

Vidora was built by Vidora INC. to give people a private, reliable way to save media without the usual clutter of ads and trackers found in other downloaders.
We believe tools should be simple, safe, and respectful of user privacy.
</section>

<section id="privacy-efficiency">
<SectionHeading
    title={$t("about.heading.privacy_efficiency")}
    sectionId="privacy-efficiency"
/>

All requests to the backend are anonymous and information about file tunnels is encrypted.
We follow a strict zero-log policy and do not store or track anything about individual users.

When extra processing is needed (remuxing or transcoding), Vidora prefers to process media directly on your device for better privacy and efficiency.

If your device cannot handle local processing, server-side processing is used instead. In that case media is streamed directly to you and never stored on disk.

You can enable forced tunneling in settings to increase privacy even further. When enabled, all downloads go through the tunnel so your network provider only sees traffic to a Vidora instance.
</section>

<section id="community">
<SectionHeading
    title={$t("about.heading.community")}
    sectionId="community"
/>

Vidora is used by creators, educators, and everyday users who want a clean way to save content.
You can check the source code and contribute [on GitHub]({contacts.github}) at any time.

If you run your own processing instance, you can add it in the instance settings.
</section>
