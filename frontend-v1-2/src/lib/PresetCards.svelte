<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, PopupSettings } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';
	import Checkbox from './Checkbox.svelte';

	const popupHoverSelect: PopupSettings = {
		event: 'hover',
		target: 'hoverSelectAll',
		placement: 'top'
	};

	const popupHoverDeselect: PopupSettings = {
		event: 'hover',
		target: 'hoverDeselectAll',
		placement: 'top'
	};
	export let header = 'Card Header';
	export let data;
	export let dataType = '';
	export let modalContent = {};
	export let isInPickedPreset = false;

	const modalSettings: ModalSettings = {
		type: 'alert',
		title: modalContent.title,
		body: modalContent.content
	};
	/* Set all for datatype checked values to true if isInPickedPreset is true */
	if (isInPickedPreset) {
		data.forEach((item) =>
			item.presets[dataType] == true ? (item.checked = true) : (item.checked = false)
		);
		console.log(data);
	}
	function selectAll() {
		data.forEach((item) => (item.checked = true));
		data = [...data]; // Reassign to ensure Svelte's reactivity
	}
	function deselectAll() {
		data.forEach((item) => (item.checked = false));
		data = [...data]; // Reassign to ensure Svelte's reactivity
	}
	console.log(data);
</script>

<div
	class="card overflow-hidden transition-all hover:shadow"
	in:fade={{ delay: 500, duration: 500 }}
>
	<div class="card-body overflow-hidden">
		<div class="variant-soft overflow-hidden p-4 flex flex-row justify-between">
			<div class="flex flex-row">
				<h3 class="h3 overflow-hidden p-2">{header}</h3>
				<button
					use:popup={popupHoverSelect}
					type="button"
					class="btn-icon [&>*]:pointer-events-none"
					on:click={() => selectAll()}
					><svg
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
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</button>
				<div
					class="card p-4 variant-glass-primary border border-primary-50"
					data-popup="hoverSelectAll"
				>
					<p class="text-lg">Alles auswählen</p>
					<div class="arrow variant-glass-primary border-b border-r border-primary-50" />
				</div>
				<button
					use:popup={popupHoverDeselect}
					type="button"
					class="btn-icon [&>*]:pointer-events-none"
					on:click={() => deselectAll()}
					><svg
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
							d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</button>
				<div
					class="card p-4 variant-glass-primary border border-primary-50"
					data-popup="hoverDeselectAll"
				>
					<p class="text-lg">Alles abwählen</p>
					<div class="arrow variant-glass-primary border-b border-r border-primary-50" />
				</div>
			</div>

			<button type="button" class="btn-icon" on:click={() => modalStore.trigger(modalSettings)}>
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
			</button>
		</div>
		<!-- Checkboxes -->
		<div class="flex flex-row flex-wrap w-full p-4 justify-center" id={dataType}>
			{#each data as item}
				{#if item.presets[dataType] == true}
					<Checkbox
						function_name={item.functionName}
						tooltip={item.tooltip}
						cbLabel={item.name}
						id={item.id}
						bind:checked={item.checked}
					/>
				{/if}
			{/each}
		</div>
		<!-- Checkboxes ende -->
	</div>
</div>
