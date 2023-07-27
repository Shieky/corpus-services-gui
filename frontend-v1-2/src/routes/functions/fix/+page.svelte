<script lang="ts">
	import PresetCards from '$lib/PresetCards.svelte';
	import { fade, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { CodeBlock } from '@skeletonlabs/skeleton';

	export let data;
	export let form;
	let cbdata = form?.data.data;
	console.log(cbdata);
	let codeString = '';
	let responseIsOk = false;
	async function handleSubmit() {
		const response = await fetch('/functions/finish', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(cbdata)
		});

		if (response.ok) {
			const jsonResponse = await response.json();
			responseIsOk = true;
			codeString = jsonResponse;
			console.log(jsonResponse);
		} else {
			console.log('HTTP-Error: ' + response.status);
		}
	}
</script>

<div
	class="flex flex-col flex-wrap justify-center items-center"
	transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}
>
	<h1 class="h1 p-4">Welche der ausgewählten Funktionen soll einen Fix bekommen?</h1>
	<h5 class="h5 p-4 w-1/2 border border-dashed border-primary-500 text-center">
		{#if !responseIsOk}
			<span in:fade={{ delay: 50, duration: 300 }}>
				Hier ein kleiner info-text was ein "fix" macht</span
			>
		{:else}
			<span in:fade={{ delay: 50, duration: 300 }}
				>Wähle nun deine Dateien aus die Bearbeitet werden sollen.<br />
				<sub>Den generierten Code welcher ausgeführt wird siehst du in dem Kasten.</sub></span
			>
		{/if}
	</h5>
</div>
<!-- <form action="finish?/upload" class="flex flex-col" method="post"> -->
{#if !responseIsOk}
	<form
		on:submit|preventDefault={handleSubmit}
		class="flex flex-col"
		transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}
	>
		<div class="grid grid-cols-6 justify-center gap-3 md:p-4 mx-auto self-center">
			<div class="col-span-full md:col-span-4 md:col-start-2 col-start-1 row-start-1 row-span-2">
				<PresetCards
					data={cbdata}
					fixMode={true}
					header="FIXBARE FUNKTIONEN"
					dataType="fix"
					modalContent=""
					checkedAndReadonly={false}
				/>
			</div>
			<div class="col-span-full md:col-span-4 md:col-start-2 col-start-1 row-start-3 row-span-2">
				<PresetCards
					data={cbdata}
					fixMode={true}
					header="NICHT FIXBARE FUNKTIONEN"
					dataType="fix"
					modalContent=""
					checkedAndReadonly={true}
				/>
			</div>
		</div>
		<button
			type="submit"
			class="btn btn-lg variant-filled hover:variant-filled-primary hover:scale-105 hover:shadow-xl w-1/2 self-center transition-all duration-300 ease-in-out m-8"
			>Weiter</button
		>
	</form>
{:else}
	<form
		on:submit|preventDefault
		class="flex flex-col"
		transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}
	>
		<div class="flex flex-col flex-wrap justify-center p-4 space-y-2">
			<!-- <label for="exb-files">EXB/EXS Datei(en)</label> -->
			<div
				class="w-1/2 self-center flex flex-row justify-center mx-auto p-4 variant-ringed-primary"
			>
				<p class="self-center font-bold px-4 w-1/2">EXB/EXS Datei(en)</p>
				<input class=" w-1/2" id="exb-files" type="file" multiple />
			</div>
			<div
				class="w-1/2 self-center flex flex-row justify-center mx-auto p-4 variant-ringed-primary"
			>
				<p class="self-center font-bold px-4 w-1/2">COMA Datei(en)</p>
				<input class=" w-1/2" id="exb-files" type="file" multiple />
			</div>
			<div
				class="w-1/2 self-center flex flex-row justify-center mx-auto p-4 variant-ringed-primary"
			>
				<p class="self-center font-bold px-4 w-1/2">Sonstige Datei(en)</p>
				<input class=" w-1/2" id="exb-files" type="file" multiple />
			</div>
			<div
				class="w-1/2 self-center flex flex-row justify-center mx-auto p-4 variant-ringed-primary"
			>
				<p class="self-center font-bold px-4 w-1/2">Ordner als ZIP</p>
				<input class=" w-1/2" id="exb-files" type="file" />
			</div>
		</div>
		<div class="w-full flex flex-wrap flex-row justify-center mx-auto self-center text-center">
			<h4 class="p-4 w-full self-center">Generierter Code</h4>
			<div class="w-3/4 p-4">
				<CodeBlock color="white" rounded="rounded" shadow="shadow-xl" code={codeString} />
			</div>
		</div>
		<button
			on:click={() => (responseIsOk = false)}
			class="btn btn-lg variant-filled hover:variant-filled-primary hover:scale-105 hover:shadow-xl w-1/2 self-center transition-all duration-300 ease-in-out m-8"
			>Zurück</button
		>
	</form>
{/if}
