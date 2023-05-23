<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	import Heading from '$lib/Components/Heading.svelte';
	import InitialCard from '$lib/Components/InitialCard.svelte';
	import { pickedState, sharedProps } from './state';
	import Checkbox from '$lib/Components/Checkbox.svelte';

	let state = 'start';
	export let data;
	const subscribe = pickedState.subscribe((value) => {
		state = value;
	});

	let csvData = data.data;

	let checkboxNames = [];
	let tmpObject = {};
	csvData.forEach((element, index) => {
		if (element[9] != '' && element[9] != undefined && index != 0) {
			tmpObject = {
				id: element[8], // id in csv
				name: element[9], // name in csv
				tooltip: element[11], // tooltip in csv
				presets: {
					hiat: element[0] == 'x' ? true : false,
					gat: element[1] == 'x' ? true : false,
					transkript: element[2] == 'x' ? true : false,
					korpus: element[3] == 'x' ? true : false,
					meta: element[4] == 'x' ? true : false,
					html: element[5] == 'x' ? true : false
				}
			};
			checkboxNames.push(tmpObject);
		}
	});
</script>

<div class="container h-1/2 mx-auto flex justify-center items-center flex-wrap">
	<div class="text-center w-full space-y-5 p-4">
		<Heading headerText={state == 'initial value' || state == 'start' ? 'Willkommen' : ''} headerSubtext={state == 'initial value' || state == 'start' ? 'Welche Dateien willst du bearbeiten?' : 'Welche funktionen möchtest du durchführen?'} />
		<hr class="border-top-gradient" />
	</div>
	{#if state == 'initial value' || state == 'start'}
		<div class="text-center w-full space-y-5" transition:fly={{ y: 200, duration: 300 }}>
			<div class="w-full flex flex-wrap flex-row justify-center">
				<InitialCard
					cardBody="Kleiner beschreibungs text"
					cardHeader="EXMARaLDA Transkript(e) HIAT/GAT"
					state="hiat"
					buttonLabel="Was ist das?"
					modalSettings={{
						type: 'alert',
						title: 'Information',
						body: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amedasdasdsadadt'
					}}
				/>
				<InitialCard
					cardBody="Kleiner beschreibungs text"
					cardHeader="EXMARaLDA Transkript(e) FORMAL"
					state="formal"
					buttonLabel="Was ist das?"
					modalSettings={{
						type: 'alert',
						title: 'Information',
						body: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amedasdasdsadadt'
					}}
				/>
				<InitialCard
					cardBody="Kleiner beschreibungs text"
					cardHeader="EXMARaLDA Segmentierungsdatei(en)"
					state="segment"
					buttonLabel="Was ist das?"
					modalSettings={{
						type: 'alert',
						title: 'Information',
						body: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amedasdasdsadadt'
					}}
				/>
				<InitialCard
					cardBody="Kleiner beschreibungs text"
					cardHeader="COMA Corpus-Datei"
					state="coma-corpus"
					buttonLabel="Was ist das?"
					modalSettings={{
						type: 'alert',
						title: 'Information',
						body: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amedasdasdsadadt'
					}}
				/>
				<InitialCard
					cardBody="Kleiner beschreibungs text"
					cardHeader="Gesamtes korpus mit COMA-Datei"
					state="coma-gesamt"
					buttonLabel="Was ist das?"
					modalSettings={{
						type: 'alert',
						title: 'Information',
						body: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amedasdasdsadadt'
					}}
				/>
			</div>
			<hr class="border border-white w-full" />
			<div class="w-full flex flex-wrap flex-row justify-center">
				<InitialCard
					cardBody="Kleiner beschreibungs text"
					cardHeader="CMDI-DATEI"
					state="cmdi"
					buttonLabel="Was ist das?"
					modalSettings={{
						type: 'alert',
						title: 'Information',
						body: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amedasdasdsadadt'
					}}
				/>
				<InitialCard
					cardBody="Kleiner beschreibungs text"
					cardHeader="ELAN-/FLEX-Datei"
					state="elan"
					buttonLabel="Was ist das?"
					modalSettings={{
						type: 'alert',
						title: 'Information',
						body: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amedasdasdsadadt'
					}}
				/>
			</div>
		</div>
	{:else}
		<div class="text-center w-full" transition:fly={{ y: 200, duration: 300 }}>
			<p>current state: {state}</p>
			<h3 class="p-4">Mögliche presets</h3>
			<div class="w-full flex flex-wrap flex-row justify-center" id="presets">
				<Checkbox
					checkboxNames={[
						{
							name: 'HIAT-Check',
							tooltip: 'tooltip für HIAT-Check',
							id: 'hiat-check',
							hasFunctionAttached: true,
							functionToRun: ['setPreset', 'hiat']
						},
						{
							name: 'GAT-Check',
							tooltip: 'tooltip für GAT-Check',
							id: 'gat-check',
							hasFunctionAttached: true,
							functionToRun: ['setPreset', 'gat']
						},
						{
							name: 'Transkript-Check',
							tooltip: 'tooltip für Transkript-Check',
							id: 'transkript-check',
							hasFunctionAttached: true,
							functionToRun: ['setPreset', 'transkript']
						},
						{
							name: 'Korpus-Check',
							tooltip: 'tooltip für Korpus-Check',
							id: 'korpus-check',
							hasFunctionAttached: true,
							functionToRun: ['setPreset', 'korpus']
						},
						{
							name: 'Metadaten-Check',
							tooltip: 'tooltip für Metadaten-Check',
							id: 'metadaten-check',
							hasFunctionAttached: true,
							functionToRun: ['setPreset', 'meta']
						},
						{
							name: 'HTML-Ansichten',
							tooltip: 'tooltip für HTML-Ansichten',
							id: 'html-ansichten',
							hasFunctionAttached: true,
							functionToRun: ['setPreset', 'html']
						}
					]}
					checkboxClasses="w-1/8"
				/>
			</div>
			<hr class="m-4" />
			<p>Durch einen hover über die möglichkeiten, erhälst du informationen über die jeweillige Funktion</p>

			<div class="w-full flex flex-wrap flex-row justify-center">
				<div class="flex flex-row flex-wrap justify-center text-center w-3/4" id="functionChecks">
					<Checkbox {checkboxNames} />
				</div>
			</div>
			<!-- 			<p>Hier findest kannst du auswählen was "gefixt" werden soll</p>
			<div class="w-full flex flex-wrap flex-row justify-center">
				<div class="flex flex-row flex-wrap justify-center text-center w-1/2">
					<Checkbox numberOfChoices="10" />
				</div>
			</div> -->
		</div>
		<div class="w-full flex flex-wrap flex-row justify-center p-4 space-x-2">
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300" on:click={() => pickedState.set('start')}> Zurück </button>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300" on:click={() => pickedState.set('stage 2')}> Weiter </button>
		</div>
	{/if}
</div>
