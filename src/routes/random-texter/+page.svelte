<script lang="ts">
	import { resolve } from '$app/paths';
	import FullWidthSection from '$lib/common/FullWidthSection.svelte';
	import PageLayout from '$lib/common/PageLayout.svelte';
	import { m } from '$lib/paraglide/messages';

	let sentenceParts = $state([
		['Created', 'Made'],
		['with love', 'under pressure'],
		['for the best audience', 'for humanity', 'without hesitation', ''],
		['by a horde of apes', 'by someone who cares']
	]);

	let randomSentence = $derived(
		sentenceParts.reduce((result, part) => {
			const next = part[Math.floor(Math.random() * part.length)];
			if (!next) return result;
			return `${result} ${next}`;
		}, '')
	);
</script>

<PageLayout
	backLink={resolve('/')}
	stretch={true}
	title={m['tools.randomTexter.title']()}
	description={m['tools.randomTexter.seoDescription']()}
>
	<FullWidthSection class="grid-rows-[max-content_1fr] gap-4">
		<p>Trying to recreate a simple random text generator</p>
		<ol class="flex flex-row gap-2">
			{#each sentenceParts as sentencePartTexts, columnIndex}
				<li>
					<ul class="grid">
						{#each sentencePartTexts as _part, cellIndex}
							<li><input bind:value={sentenceParts[columnIndex][cellIndex]} /></li>
						{/each}
					</ul>
				</li>
			{/each}
		</ol>
		<p>{randomSentence}</p>
	</FullWidthSection>
</PageLayout>
