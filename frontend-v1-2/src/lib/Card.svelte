<script lang="ts">
	export let cardHeader = 'Card Header';
	export let cardBody = 'Card Body';
	export let cardFooterLink = '#';
	import { fade } from 'svelte/transition';
</script>

<div
	class="card overflow-hidden transition-all hover:shadow"
	in:fade={{ delay: 500, duration: 500 }}
>
	<div class="card-body overflow-hidden">
		<h3 class="h3 text-center variant-soft overflow-hidden p-4">
			{cardHeader}
		</h3>
		<p class="text-center p-4">
			{cardBody}
		</p>
	</div>
	<div class="card-footer text-center m-4">
		<a
			href={cardFooterLink}
			class="btn btn-lg variant-filled hover:variant-filled-primary hover:scale-105 hover:shadow-xl"
			>Auswählen</a
		>
	</div>
</div>
