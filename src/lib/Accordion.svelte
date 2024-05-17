<script lang="ts">
	import { Accordion, AccordionItem, CodeBlock } from '@skeletonlabs/skeleton';

	export let summary;
	export let content;

	export let codeBlockString: string | null = null;
</script>

<Accordion width="w-3/4">
	<AccordionItem>
		<svelte:fragment slot="summary">{summary}</svelte:fragment>
		<div class="w-full flex flex-wrap flex-row justify-center mx-auto self-center" slot="content">
			<h4 class="p-4 w-full self-center">{content}</h4>

			{#if codeBlockString}
				<div class="w-full p-4">
					<CodeBlock color="white" rounded="rounded" shadow="shadow-xl" code={codeBlockString} />
				</div>
			{/if}
		</div>
	</AccordionItem>
</Accordion>
