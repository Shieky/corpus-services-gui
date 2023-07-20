<script lang="ts">
	import PresetCards from '$lib/PresetCards.svelte';

	export let data;
	export let form;
	let cbdata = form?.data.data;
	console.log(cbdata);
</script>

<div
	class="flex flex-col flex-wrap justify-center items-center"
	transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}
>
	<h1 class="h1 p-4">Welche der ausgewählten Funktionen soll einen Fix bekommen?</h1>
	<h5 class="h5 p-4 w-1/2 border border-dashed border-primary-500 text-center">
		Hier ein kleiner info-text was ein "fix" macht
	</h5>
</div>
<button class="btn" on:click={() => console.log(data)}> CONSOLELOG </button>
<form action="" class="flex flex-col" method="post">
	<div class="grid grid-cols-6 justify-center gap-3 md:p-4 mx-auto self-center">
		<div class="col-span-full md:col-span-4 md:col-start-2 col-start-1 row-start-1 row-span-2">
			<PresetCards data={cbdata} header="FIXBARE FUNKTIONEN" dataType="fix" modalContent="" />
		</div>
	</div>
	<button
		type="submit"
		class="btn btn-lg variant-filled hover:variant-filled-primary hover:scale-105 hover:shadow-xl w-1/2 self-center transition-all duration-300 ease-in-out m-8"
		>Weiter</button
	>
</form>
