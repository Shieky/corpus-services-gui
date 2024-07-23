<script lang="ts">
	import PresetCards from '$lib/PresetCards.svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let cbdata;
	let codeString = '';
	let responseIsOk = false;
	let internalCodeString = '';

	let dispatch = createEventDispatcher();

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
			codeString = jsonResponse.codeString;
			internalCodeString = jsonResponse.internalCodeString;
			dispatch('responseOK', {
				codeString: codeString,
				internalCodeString: internalCodeString
			});
		} else {
			console.log('HTTP-Error: ' + response.status);
		}
	}
</script>

<div
	class="flex flex-col flex-wrap justify-center items-center my-10 space-y-10"
	in:fade|global={{ delay: 100, duration: 300 }}
>
	<h1 class="h1 p-4">Welche der ausgewählten Funktionen soll eine Korrektur ausführen?</h1>
	<h5
		class="h5 p-4 w-1/2 variant-glass-tertiary text-center outline outline-offset-8 outline-secondary-500 border-secondary-400"
	>
		<span in:fade|global={{ delay: 100, duration: 300 }}>
			Hier kannst du erkennen, ob von dir ausgewählte Funktionen auch eine Korrektur durchführen
			können, und diese entsprechend anwählen. Über das (i) erhältst du eine kurze Beschreibung,
			welche Korrekturen mithilfe der Funktion durchgeführt werden.
		</span>
	</h5>
</div>
<form
	on:submit|preventDefault={handleSubmit}
	class="flex flex-col"
	in:fade|global={{ delay: 100, duration: 300 }}
>
	<div class="grid grid-cols-6 justify-center gap-3 md:p-4 mx-auto self-center">
		<div class="col-span-full md:col-span-4 md:col-start-2 col-start-1 row-start-1 row-span-2">
			<PresetCards
				data={cbdata}
				fixMode={true}
				header="Korrektur-FUNKTIONEN"
				dataType="fix"
				modalContent=""
				checkedAndReadonly={false}
			/>
		</div>
		<div class="col-span-full md:col-span-4 md:col-start-2 col-start-1 row-start-3 row-span-2">
			<PresetCards
				data={cbdata}
				fixMode={true}
				header="Ausgewählte Funktionen (Prüfung/Visualisierung)"
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
