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
	let codeResult = $derived(`
const sentenceParts = ${JSON.stringify(sentenceParts, null, 2)};
function getRandomText(): string {
  return sentenceParts.reduce((result, part) => {
    const next = part[Math.floor(Math.random() * part.length)];
    if (!next) return result;
    return \`\${result} \${next}\`;
  }, '');
}
`);

	function updateRandomSentence() {
		sentenceParts = [...sentenceParts];
	}
	function addPartToColumn(columnIndex: number) {
		sentenceParts = [
			...sentenceParts.slice(0, columnIndex),
			[...sentenceParts[columnIndex], ''],
			...sentenceParts.slice(columnIndex + 1)
		];
	}
	function removePartFromColumn(columnIndex: number, cellIndex: number) {
		sentenceParts = [
			...sentenceParts.slice(0, columnIndex),
			[
				...sentenceParts[columnIndex].slice(0, cellIndex),
				...sentenceParts[columnIndex].slice(cellIndex + 1)
			],
			...sentenceParts.slice(columnIndex + 1)
		];
	}

	async function copyToClipboard(code: string) {
		await navigator.clipboard.writeText(code);
	}
</script>

<PageLayout
	backLink={resolve('/')}
	stretch={true}
	title={m['tools.randomTexter.title']()}
	description={m['tools.randomTexter.seoDescription']()}
>
	<FullWidthSection class="grid-rows-[max-content_1fr] gap-4">
		<ol class="flex flex-row gap-4">
			{#each sentenceParts as sentencePartTexts, columnIndex}
				<li>
					<ul class="grid gap-2">
						{#each sentencePartTexts as _part, cellIndex}
							<li class="grid grid-cols-[1fr_max-content]">
								<input bind:value={sentenceParts[columnIndex][cellIndex]} />
								<button
									type="button"
									class="w-full bg-red-50 px-2"
									onclick={() => removePartFromColumn(columnIndex, cellIndex)}>🗑️</button
								>
							</li>
						{/each}
						<li class="grid rounded-b-4xl bg-blue-50 p-2">
							<button type="button" class="w-full" onclick={() => addPartToColumn(columnIndex)}
								>➕</button
							>
						</li>
					</ul>
				</li>
			{/each}
		</ol>
		<p>{randomSentence}</p>
		<button onclick={updateRandomSentence}>{m['tools.randomTexter.refreshButton']()}</button>
		<details>
			<summary
				>Code <button type="button" onclick={() => copyToClipboard(codeResult)}>📋</button></summary
			>

			<pre>
				{codeResult}
			</pre>
		</details>
	</FullWidthSection>
</PageLayout>
