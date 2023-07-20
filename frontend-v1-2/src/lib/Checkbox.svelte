<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { checkboxNames } from '../states';

	export let cbLabel = 'Checkbox Label';
	export let tooltip = 'Tooltip';
	export let id: string;
	export let uniqueName: string;

	export let checked: boolean;

	export let isReadonly = false;
	//checked = isInPickedPreset;

	const popupHover: PopupSettings = {
		event: 'hover',
		target: id + 'popupHover',
		placement: 'top'
	};

	$: {
		checked = checked;
	}
</script>

<div class="w-1/2">
	<label
		id="{id}label"
		use:popup={popupHover}
		class="flex items-center space-x-2 m-1 p-4 rounded-lg {!isReadonly
			? 'hover:variant-ghost-primary cursor-pointer'
			: ''}  transition-all self-center h-16 [&>*]:pointer-events-none
        {checked
			? isReadonly
				? 'variant-ghost-tertiary'
				: 'variant-ghost-primary'
			: 'variant-ghost'}"
	>
		<input
			bind:checked
			class="checkbox transition-all"
			type="checkbox"
			name={uniqueName}
			{id}
			disabled={isReadonly}
		/>
		<p>{cbLabel}</p>
		<!-- Add a hidden field if isReadonly is true -->
		{#if isReadonly}
			<input type="hidden" name={uniqueName} value="true" />
		{/if}
	</label>
</div>
<div class="card p-4 variant-glass-primary border border-primary-50" data-popup="{id}popupHover">
	<p class="text-lg">{tooltip}</p>
	<div class="arrow variant-glass-primary border-b border-r border-primary-50" />
</div>
