<script lang="ts">
	import Modal from '$lib/Components/Modal.svelte';
	import { setPickedState, getPickState } from '../../routes/state';

	export let modalSettings: modalSettings;
	export let buttonLabel: string;
	export let state: string;
	export let cardHeader: string;
	export let cardBody: string;
	type modalSettings = {
		type: string;
		title: string;
		body: string;
	};
</script>

<div class="card card-hover p-4 rounded-sm w-1/3 m-4 hover:border border-primary-500">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click={() => setPickedState(state)} class="cursor-pointer">
		<h3 class="font-light p-4 no-underline">{cardHeader}</h3>
		<p class="p-4">{cardBody}</p>
	</div>
	<div class="card-footer text-center">
		<Modal {buttonLabel} {modalSettings} />
	</div>
</div>
