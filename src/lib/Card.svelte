<script lang="ts">
	import { fade } from 'svelte/transition';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, PopupSettings } from '@skeletonlabs/skeleton';

	export let cardHeader = 'Card Header';
	export let cardBody = 'Card Body';
	export let cardFooterLink = '#';
	export let modalContent = {};

	const modalSettings: ModalSettings = {
		type: 'alert',
		title: modalContent.title,
		body: modalContent.content
	};
</script>

<div
	class="card overflow-hidden transition-all hover:shadow"
	in:fade|global={{ delay: 500, duration: 500 }}
>
	<div class="card-body overflow-hidden">
		<h3 class="h3 text-center variant-soft overflow-hidden p-4">
			{cardHeader}
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
		</h3>
		<p class="text-center p-4">
			{cardBody}
		</p>
	</div>
	<div class="card-footer text-center m-4">
		<a
			href={cardFooterLink}
			class="btn btn-lg variant-filled hover:variant-filled-primary hover:scale-105 hover:shadow-xl"
			>Start</a
		>
	</div>
</div>
