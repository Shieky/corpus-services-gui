<script lang="ts">
	import '../theme.postcss';
	// The ordering of these imports is critical to your app working properly
	/* 	import '@skeletonlabs/skeleton/themes/theme-modern.css'; */
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar, Modal, LightSwitch } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { pickedState, setPickedState } from './state';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	let state = 'start';

	const subscribe = pickedState.subscribe((value) => {
		state = value;
	});
</script>

<!-- App Shell -->
<Modal />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<AppShell>
	<svelte:fragment slot="header">
		<AppBar slotDefault="place-self-center ">
			<svelte:fragment slot="lead">
				<a href="/" class="text-xl uppercase font-normal" />
			</svelte:fragment>
			<svelte:fragment slot="default">
				<p class="text-lg cursor-pointer" on:click={() => setPickedState('start')}>Reset state</p>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="footer">
		<div class="text-center text-gray-500 pt-4 text-xs m-3 border-top-gradient">
			<p>Made with ❤️ by Felicitaz</p>
		</div>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

<style>
	.border-top-gradient {
		position: relative;
	}

	.border-top-gradient::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px; /* Set the border height here */
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(0, 153, 255, 0.527) 50%,
			transparent 100%
		); /* Set the gradient colors here */
	}
</style>
