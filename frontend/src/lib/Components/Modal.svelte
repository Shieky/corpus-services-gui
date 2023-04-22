<script lang="ts">
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

	export let modalSettings: ModalSettings;
	export let buttonLabel: string;
	type modalSettings = {
		type: string;
		title: string;
		body: string;
	};

	function modalDemo(settings: modalSettings): void {
		modalStore.trigger(settings);
	}
</script>

<button
	class="btn btn-lg bg-primary-700 w-full hover:bg-secondary-700 hover:text-white hover:scale-105 transition-all ease-in-out"
	on:click={modalDemo(modalSettings)}>{buttonLabel}</button
>
