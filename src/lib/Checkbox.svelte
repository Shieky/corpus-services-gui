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
			class="checkbox transition-all bg-secondary-500 {isReadonly ? 'invisible -m-3' : ''}"
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
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
				/>
			</svg>
		</div>
	</label>
</div>
<div class="card p-4 variant-glass-primary border border-primary-50" data-popup="{id}popupHover">
	<p class="text-lg">{tooltip}</p>
	<div class="arrow variant-glass-primary border-b border-r border-primary-50" />
</div>
