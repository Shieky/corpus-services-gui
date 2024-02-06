<script lang="ts">
	import PresetCards from '$lib/PresetCards.svelte';
	import { fade, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { ProgressBar } from '@skeletonlabs/skeleton';

	export let data;
	export let form;
	let cbdata = form?.data.data;
	//console.log(cbdata);

	let codeString = '';
	let responseIsOk = false;
	let internalCodeString = '';
	let formLoading = false;
	let logString = 'test';
	$: logString = 'test';
	let taskCompleted = false;
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
			codeString = jsonResponse.codeString;
			internalCodeString = jsonResponse.internalCodeString;
			/* 			console.log(codeString);
			console.log(internalCodeString); */
		} else {
			console.log('HTTP-Error: ' + response.status);
		}
	}
</script>

<!-- <form action="finish?/upload" class="flex flex-col" method="post"> -->
{#if !responseIsOk}
	<div
		class="flex flex-col flex-wrap justify-center items-center my-10 space-y-10"
		in:fade={{ delay: 100, duration: 300 }}
	>
		<h1 class="h1 p-4">Welche der ausgewählten Funktionen soll eine Korrektur ausführen?</h1>
		<h5 class="h5 p-4 w-1/2 variant-glass-tertiary text-center border border-secondary-400">
			<span in:fade={{ delay: 100, duration: 300 }}>
				Hier kannst du erkennen, ob von dir ausgewählte Funktionen auch eine Korrektur durchführen
				können, und diese entsprechend anwählen. Über das (i) erhältst du eine kurze Beschreibung,
				welche Korrekturen mithilfe der Funktion durchgeführt werden.
			</span>
		</h5>
	</div>
	<form
		on:submit|preventDefault={handleSubmit}
		class="flex flex-col"
		in:fade={{ delay: 100, duration: 300 }}
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
{:else}
	<div
		class="flex flex-col flex-wrap justify-center items-center my-10 space-y-10"
		in:fade={{ delay: 100, duration: 300 }}
	>
		<h1 class="h1 p-4">Dateien Auswählen und Hochladen</h1>
		<h5 class="h5 p-4 w-1/2 variant-glass-tertiary text-center border border-secondary-400">
			<span in:fade={{ delay: 100, duration: 300 }}>
				Hier kannst du die Dateien hochladen, auf die die ausgewählten Funktionen angewendet werden
				sollen.<br />
			</span>
			<span in:fade={{ delay: 100, duration: 300 }}>
				<sub class="leading-[1px]"
					>Die Dateien werden nur für die Dauer der Prüfung gespeichert und anschließend sofort
					wieder gelöscht. Falls du dennoch Bedenken hast, kannst du den generierten Code nutzen, um
					die Corpus Services bei dir lokal auszuführen (Achtung: Die Corpus Services können nur
					über die Konsole ausgeführt werden und haben keine grafische Oberfläche).</sub
				></span
			>
		</h5>
	</div>
	<form
		use:enhance={() => {
			formLoading = true;
			return async ({ update, result, formData }) => {
				formLoading = false;
				const body = await result?.data.body;
				const downloadUri = body?.zipName;
				const log = body?.log;
				logString = log;
				console.log(logString);
				// console.log(downloadUri);
				/* run get function */
				const res = await fetch(`/functions/finish?file=${downloadUri}`, {
					method: 'GET'
				});
				if (res.ok) {
					// Create a blob from the response
					const blob = await res.blob();
					// Create a link element
					const link = document.createElement('a');
					link.href = window.URL.createObjectURL(blob);
					link.download = 'corpus.zip';

					// Append to the document and trigger the download
					document.body.appendChild(link);
					link.click();

					// Clean up by removing the link element
					document.body.removeChild(link);
				} else {
					console.error('Fetch error:', res.statusText);
				}
				taskCompleted = true;
				update();
			};
		}}
		method="post"
		action="finish?/upload"
		enctype="multipart/form-data"
		class="flex flex-col"
		in:fade={{ delay: 100, duration: 300 }}
	>
		<div class="flex flex-col flex-wrap justify-center p-4 space-y-2">
			<!-- <label for="exb-files">EXB/EXS Datei(en)</label> -->
			<div
				class="w-1/2 self-center flex flex-row justify-center mx-auto p-4 variant-ringed-primary"
			>
				<p class="self-center font-bold px-4 w-1/2">EXB/EXS Datei(en)</p>
				<input class=" w-1/2" id="exb_files" name="exb_files" type="file" multiple />
			</div>
			<div
				class="w-1/2 self-center flex flex-row justify-center mx-auto p-4 variant-ringed-primary"
			>
				<p class="self-center font-bold px-4 w-1/2">COMA Datei(en)</p>
				<input class=" w-1/2" id="coma_files" name="coma_files" type="file" multiple />
			</div>
			<div
				class="w-1/2 self-center flex flex-row justify-center mx-auto p-4 variant-ringed-primary"
			>
				<p class="self-center font-bold px-4 w-1/2">Sonstige Datei(en)</p>
				<input class=" w-1/2" id="misc_-files" name="misc_files" type="file" multiple />
			</div>
			<!-- 			<div
				class="w-1/2 self-center flex flex-row justify-center mx-auto p-4 variant-ringed-primary"
			>
				<p class="self-center font-bold px-4 w-1/2">Ordner als ZIP</p>
				<input class=" w-1/2" id="exb-files" type="file" />
			</div> -->
		</div>
		<input type="hidden" name="internalCode" value={internalCodeString} />
		<div class="w-full flex flex-wrap flex-row justify-center mx-auto self-center text-center">
			<Accordion width="w-3/4">
				<AccordionItem>
					<svelte:fragment slot="summary">Generierter Code</svelte:fragment>
					<div
						class="w-full flex flex-wrap flex-row justify-center mx-auto self-center text-center"
						slot="content"
					>
						<h4 class="p-4 w-full self-center">Generierter Code</h4>

						<div class="w-full p-4">
							<CodeBlock color="white" rounded="rounded" shadow="shadow-xl" code={codeString} />
						</div>
					</div>
				</AccordionItem>
			</Accordion>
		</div>
		{#if taskCompleted}
			<div class="w-full flex flex-wrap flex-row justify-center mx-auto self-center">
				<Accordion width="w-3/4">
					<AccordionItem>
						<svelte:fragment slot="summary">Corpus logs</svelte:fragment>
						<div
							class="w-full flex flex-wrap flex-row justify-center mx-auto self-center"
							slot="content"
						>
							<h4 class="p-4 w-full self-center">Log von Corpus services</h4>

							<div class="w-full p-4">
								<CodeBlock color="white" rounded="rounded" shadow="shadow-xl" code={logString} />
							</div>
						</div>
					</AccordionItem>
				</Accordion>
			</div>
		{/if}
		<div class="flex flex-row w-full lg:w-3/4 justify-center items-center self-center">
			<div class="flex flex-col w-full justify-center">
				{#if !formLoading}
					{#if !taskCompleted}
						<div
							class="flex flex-row self-center justify-center items-center w-1/2"
							transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}
						>
							<button
								on:click={(e) => {
									e.preventDefault();
									responseIsOk = false;
								}}
								class="btn btn-lg variant-filled-warning hover:variant-filled-primary hover:scale-105 hover:shadow-xl w-1/2 self-center transition-all duration-300 ease-in-out m-8"
								>Zurück</button
							>
							<button
								type="submit"
								class="btn btn-lg variant-filled-primary hover:variant-filled-primary hover:scale-105 hover:shadow-xl w-1/2 self-center transition-all duration-300 ease-in-out m-8"
								>Hochladen</button
							>
						</div>
					{/if}
				{:else}
					<div
						class="w-1/2 self-center space-y-10 flex flex-col justify-center"
						in:fade={{ delay: 100, duration: 300 }}
					>
						<h5 class="h5 p-4 variant-glass-tertiary text-center border border-secondary-400">
							Deine Dateien werden hochgeladen und verarbeitet - dies kann je nach Dateigröße und
							Uploadgeschwindigkeit einige Minuten dauern.
						</h5>
						<ProgressBar />
					</div>
				{/if}
				{#if taskCompleted}
					<h5 class="h5 p-4 variant-glass-tertiary text-center border border-primary-400">
						Deine Dateien wurden erfolgreich verarbeitet
					</h5>
				{/if}
			</div>
		</div>
	</form>
{/if}
