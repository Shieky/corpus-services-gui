<script lang="ts">
	import PresetCards from '$lib/PresetCards.svelte';
	import { fade, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Accordion from '$lib/Accordion.svelte';
	import { enhance } from '$app/forms';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import FixForm from '$lib/Forms/FixForm.svelte';
	import FileInput from '$lib/FileInput.svelte';
	export let data;
	export let form;

	let cbdata = form?.data.data;
	//console.log(cbdata);

	let codeString = '';
	let responseIsOk = false;
	let internalCodeString = '';
	let formLoading = false;
	let logString = '';
	let errorlogString = '';
	$: logString = '';
	$: errorlogString = '';
	let taskCompleted = false;
	let tasknotFailed = true;
	let fileDownloadUri = '';
	let fileSuccessfullyDownloaded = false;

	//catch dispatch
	const handleResponseOK = (event) => {
		codeString = event.detail.codeString;
		internalCodeString = event.detail.internalCodeString;
		responseIsOk = true;
	};
	function downloadFile(): void {
		fetch(`/functions/finish?file=${fileDownloadUri}`).then((response) => {
			// get the filesize from the header
			const contentLength = response.headers.get('content-length');
			const filesize = contentLength ? parseInt(contentLength, 10) : 0;
			// create a new ReadableStream to read the response
			const reader = response.body?.getReader();
			//download the file and track the progress
			const download = (loaded = 0) => {
				reader
					?.read()
					.then(({ done, value }) => {
						if (done) {
							//delete the file after download
							fetch(`/functions/finish?file=${fileDownloadUri}`, {
								method: 'DELETE'
							}).then((response) => {
								response.json().then((data) => {
									if (data.success == true) {
										fileSuccessfullyDownloaded = true;
									} else {
										console.log('File not deleted');
									}
								});
							});
							return;
						}
						loaded += value?.length || 0;
						download(loaded);
					})
					.catch((error) => {
						console.error('Download failed', error);
					});
			};
			// start the download
			download();
			// create a new anchor element to download the file
			const anchor = document.createElement('a');
			console.log(response.url);
			anchor.href = response.url;
			anchor.download = 'corpus.zip';
			anchor.click();
		});
	}
</script>

<!-- <form action="finish?/upload" class="flex flex-col" method="post"> -->
{#if !responseIsOk}
	<FixForm {cbdata} on:responseOK={handleResponseOK} />
{:else}
	<div
		class="flex flex-col flex-wrap justify-center items-center my-10 space-y-10"
		in:fade|global={{ delay: 100, duration: 300 }}
	>
		<h1 class="h1 p-4">Dateien Auswählen und Hochladen</h1>
		<h5
			class="h5 p-4 w-1/2 variant-glass-tertiary text-center outline outline-offset-8 outline-secondary-500 border-secondary-400"
		>
			<span in:fade|global={{ delay: 100, duration: 300 }}>
				Hier kannst du die Dateien hochladen, auf die die ausgewählten Funktionen angewendet werden
				sollen.<br />
			</span>
			<span in:fade|global={{ delay: 100, duration: 300 }}>
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
				if (result?.data.status != '500') {
					formLoading = false;
					const body = await result?.data.body;
					console.log(body);
					const downloadUri = body?.zipName;
					const log = body?.log;
					const errLog = body?.errorLog;
					logString = log;
					errorlogString = errLog;
					fileDownloadUri = downloadUri;
					taskCompleted = true;
				} else {
					formLoading = false;
					const body = await result?.data.body;
					const log = body?.errorLog;
					// console.log(log);
					errorlogString = log;
					taskCompleted = true;
					tasknotFailed = false;
				}
				update();
			};
		}}
		method="post"
		action="finish?/upload"
		enctype="multipart/form-data"
		class="flex flex-col"
		in:fade|global={{ delay: 100, duration: 300 }}
	>
		<div class="flex flex-row flex-wrap p-4 justify-center items-center space-x-4">
			<FileInput inputName="exb_files" label="EXB/EXS Datei(en)" />
			<FileInput inputName="coma_files" label="COMA Datei(en)" />
			<FileInput inputName="misc_files" label="Sonstige Datei(en)" />
		</div>
		<input type="hidden" name="internalCode" value={internalCodeString} />
		<div class="w-full flex flex-wrap flex-row justify-center mx-auto self-center text-center">
			<Accordion
				summary="Generierter Code"
				content="Generierter Code"
				codeBlockString={codeString}
			/>
		</div>
		{#if taskCompleted}
			{#if logString != ''}
				<div class="w-full flex flex-wrap flex-row justify-center mx-auto self-center">
					<Accordion
						summary="Corpus logs"
						content="Log von den Corpus services"
						codeBlockString={logString}
					/>
				</div>
			{/if}
			{#if errorlogString != ''}
				<div class="w-full flex flex-wrap flex-row justify-center mx-auto self-center">
					<Accordion
						summary="Corpus logs - fehler"
						content="Fehler von den Corpus services"
						codeBlockString={errorlogString}
					/>
				</div>
			{/if}
		{/if}
		<div class="flex flex-row w-full lg:w-3/4 justify-center items-center self-center">
			<div class="flex flex-col w-full justify-center">
				{#if !formLoading}
					{#if !taskCompleted}
						<div
							class="flex flex-row self-center justify-center items-center w-1/2"
							in:slide|global={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}
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
						in:fade|global={{ delay: 100, duration: 300 }}
					>
						<h5 class="h5 p-4 variant-glass-tertiary text-center border border-secondary-400">
							Deine Dateien werden hochgeladen und verarbeitet - dies kann je nach Dateigröße und
							Uploadgeschwindigkeit einige Minuten dauern.
						</h5>
						<ProgressBar />
					</div>
				{/if}
			</div>
		</div>
	</form>
	<div class="flex flex-col justify-center items-center">
		{#if taskCompleted && tasknotFailed}
			<h5 class="h5 p-4 variant-glass-tertiary text-center border border-primary-400 w-2/3">
				{#if fileSuccessfullyDownloaded}
					Deine Dateien wurden erfolgreich verarbeitet und heruntergeladen, vielen Dank für die
					Nutzung
				{:else}
					Deine Dateien wurden erfolgreich verarbeitet
				{/if}
			</h5>
			{#if !fileSuccessfullyDownloaded}
				<button
					on:click={() => downloadFile()}
					class="btn btn-lg variant-filled-primary hover:variant-filled-primary hover:scale-105 hover:shadow-xl w-1/2 self-center transition-all duration-300 ease-in-out m-8"
					>Verarbeitete Dateien Herunterladen</button
				>
			{/if}
		{/if}
		{#if taskCompleted && !tasknotFailed}
			<h5 class="h5 p-4 variant-glass-error text-center border border-primary-400">
				Deine Dateien konnten nicht verarbeitet werden. Bitte überprüfe die Log-Datei.
			</h5>
		{/if}
	</div>
{/if}
