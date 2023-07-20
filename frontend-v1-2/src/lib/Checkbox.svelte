<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	export let cbLabel = 'Checkbox Label';
	export let tooltip = 'Tooltip';
	export let id: string;
	export let function_name: string;

	export let checked: boolean;

	//checked = isInPickedPreset;

	const popupHover: PopupSettings = {
		event: 'hover',
		target: id + 'popupHover',
		placement: 'top'
	};

	$: {
		checked = checked;
		console.log('REACTIVE cb');
	}
</script>

<div class="w-1/2">
	<label
		id="{id}label"
		use:popup={popupHover}
		class="flex items-center space-x-2 m-1 p-4 rounded-lg hover:variant-ghost-primary cursor-pointer transition-all self-center h-16 [&>*]:pointer-events-none
        {checked ? 'variant-ghost-primary' : 'variant-ghost'}"
	>
		<input bind:checked class="checkbox transition-all" type="checkbox" name={function_name} {id} />
		<p>{cbLabel}</p>
	</label>
</div>
<div class="card p-4 variant-glass-primary border border-primary-50" data-popup="{id}popupHover">
	<p class="text-lg">{tooltip}</p>
	<div class="arrow variant-glass-primary border-b border-r border-primary-50" />
</div>
