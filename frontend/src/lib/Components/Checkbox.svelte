<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	let settings = 'settings';
	let checkboxes = [];
	export let numberOfChoices: number = 10;
	export let checkboxClasses: string = 'w-1/4';
	export let checkboxNames: any = [];
	//console.log(checkboxNames[2].name);

	/* check if checkboxNames is empty if not count */
	if (checkboxNames.length > 0) {
		numberOfChoices = checkboxNames.length;
	}

	for (let index: number = 1; index <= numberOfChoices; index++) {
		let id = checkboxNames[index - 1] != undefined ? checkboxNames[index - 1].id || index : index;
		window[settings + id] = {
			event: 'hover',
			target: `tooltip-${id}`,
			placement: 'top'
		};
		checkboxes.push({
			id: id,

			name: ` ${checkboxNames[index - 1] != undefined ? checkboxNames[index - 1].name : '' || 'Checkbox ' + id}`,
			tooltip: `${checkboxNames[index - 1] != undefined ? checkboxNames[index - 1].tooltip : '' || 'Tooltip' + id}`,
			checked: false,
			dataPopup: `tooltip-${id}`
		});
	}
</script>

{#each checkboxes as checkbox (checkbox.id)}
	<label
		use:popup={window[settings + checkbox.id]}
		class="flex items-center justify-center space-x-2 {checkboxClasses} p-2 card-hover m-2 cursor-pointer text-center hover:bg-secondary-400
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
