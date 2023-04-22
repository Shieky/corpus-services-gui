<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	let settings = 'settings';
	let checkboxes = [];
	for (let index: number = 1; index <= 10; index++) {
		window[settings + index] = {
			event: 'hover',
			target: `tooltip-${index}`,
			placement: 'top'
		};
		checkboxes.push({
			id: index,
			name: `Checkbox ${index}`,
			tooltip: `Tooltip ${index}`,
			checked: false,
			dataPopup: `tooltip-${index}`
		});
	}
</script>

<div class="flex flex-row flex-wrap justify-center text-center w-1/2">
	{#each checkboxes as checkbox (checkbox.id)}
		<label
			use:popup={window[settings + checkbox.id]}
			class="flex items-center justify-center space-x-2 w-1/4 p-2 card-hover m-2 cursor-pointer text-center hover:bg-secondary-400
             {checkbox.checked ? 'bg-primary-500 outline outline-1 outline-white' : 'card'}"
		>
			<input type="checkbox" bind:checked={checkbox.checked} class="hidden" />
			<p class="text-center p-2">{checkbox.name}</p>
		</label>
		<div class="dark:bg-slate-600 bg-white p-4" data-popup={checkbox.dataPopup}>
			{checkbox.tooltip}
			<!-- Append the arrow element -->
			<div class="arrow dark:bg-slate-600 bg-white" />
		</div>
	{/each}
</div>
