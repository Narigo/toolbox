<script lang="ts">
	import { resolve } from '$app/paths';
	import FullWidthSection from '$lib/common/FullWidthSection.svelte';
	import PageLayout from '$lib/common/PageLayout.svelte';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
</script>

<PageLayout
	backLink={resolve('/')}
	stretch={true}
	title={m['tools.randomTexter.title']()}
	description={m['tools.randomTexter.seoDescription']()}
>
	<FullWidthSection class="grid-rows-[max-content_1fr]">
		<p>Trying to recreate a simple random text generator</p>
	</FullWidthSection>
</PageLayout>
