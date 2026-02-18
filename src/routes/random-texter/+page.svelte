<script lang="ts">
	import { resolve } from '$app/paths';
	import FullWidthSection from '$lib/common/FullWidthSection.svelte';
	import PageLayout from '$lib/common/PageLayout.svelte';
	import { m } from '$lib/paraglide/messages';
	import { getInitialContent, saveToLocalStorage } from './get-initial-content';

	let sentenceParts = $state(getInitialContent());

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
	function removeColumn(columnIndex: number) {
		sentenceParts = [
			...sentenceParts.slice(0, columnIndex),
			...sentenceParts.slice(columnIndex + 1)
		];
	}
	function addPartToColumn(columnIndex: number) {
		sentenceParts = [
			...sentenceParts.slice(0, columnIndex),
			[...sentenceParts[columnIndex], ''],
			...sentenceParts.slice(columnIndex + 1)
		];
	}
	function removePartFromColumn(columnIndex: number, cellIndex: number) {
		if (sentenceParts[columnIndex].length === 1) {
			return removeColumn(columnIndex);
		}
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

	function save() {
		saveToLocalStorage(sentenceParts);
	}

	function addColumn(columnIndex: number) {
		sentenceParts = [
			...sentenceParts.slice(0, columnIndex),
			[''],
			...sentenceParts.slice(columnIndex)
		];
	}
</script>

<PageLayout
	backLink={resolve('/')}
	stretch={true}
	title={m['tools.randomTexter.title']()}
	description={m['tools.randomTexter.seoDescription']()}
>
	<FullWidthSection class="grid-rows-[max-content_1fr] gap-4">
		<ol class="flex flex-row gap-4 pt-8">
			{#each sentenceParts as sentencePartTexts, columnIndex}
				<li class="relative">
					<button
						type="button"
						class="absolute -top-8 -left-12 w-20 rounded-b-4xl h-16 bg-blue-50 p-2 [corner-shape:scoop]"
						onclick={() => addColumn(columnIndex)}>➕</button
					>
					<ul class="grid gap-2">
						<li class="grid rounded-t-4xl bg-red-50">
							<button class="p-2" type="button" onclick={() => removeColumn(columnIndex)}>🗑️</button
							>
						</li>
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
						<li class="grid rounded-b-4xl bg-blue-50">
							<button type="button" class="w-full p-2" onclick={() => addPartToColumn(columnIndex)}
								>➕</button
							>
						</li>
					</ul>
				</li>
			{/each}
			<li class="grid rounded-r-4xl bg-blue-50">
				<button type="button" class="w-full p-2" onclick={() => addColumn(sentenceParts.length)}
					>➕</button
				>
			</li>
		</ol>
		<p>{randomSentence}</p>
		<div>
			<button type="button" onclick={updateRandomSentence}
				>{m['tools.randomTexter.refreshButton']()}</button
			>
			<button type="button" onclick={save}>{m['tools.randomTexter.saveButton']()}</button>
		</div>
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
