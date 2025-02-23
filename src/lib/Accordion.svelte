<script lang="ts">
	import { Accordion, AccordionItem, CodeBlock } from '@skeletonlabs/skeleton';


	interface Props {
		summary: any;
		content: any;
		codeBlockString?: string | null;
	}

	let { summary, content, codeBlockString = null }: Props = $props();
</script>

<Accordion width="w-3/4">
	<AccordionItem>
		{#snippet summary()}
				{summary}
			{/snippet}
		{#snippet content()}
				<div class="w-full flex flex-wrap flex-row justify-center mx-auto self-center" >
				<h4 class="p-4 w-full self-center">{content}</h4>

				{#if codeBlockString}
					<div class="w-full p-4">
						<CodeBlock color="white" rounded="rounded" shadow="shadow-xl" code={codeBlockString} />
					</div>
				{/if}
			</div>
			{/snippet}
	</AccordionItem>
</Accordion>
