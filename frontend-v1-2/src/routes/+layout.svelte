<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar, Modal, LightSwitch } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	let state = 'start';
</script>

<!-- App Shell -->
<Modal padding="p-8" regionBody="max-h-[400px] variant-ghost rounded-2xl p-4" />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar slotDefault="place-self-center ">
			<svelte:fragment slot="lead">
				<a href="/" class="text-xl uppercase font-normal" />
			</svelte:fragment>
			<svelte:fragment slot="default" />
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="footer">
		<div class="text-center text-gray-500 pt-4 text-xs mb-3 border-top-gradient">
			<p>Made with ❤️ by Felicitaz</p>
		</div>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

<style>
</style>
