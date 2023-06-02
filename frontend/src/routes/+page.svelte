<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	import Heading from '$lib/Components/Heading.svelte';
	import InitialCard from '$lib/Components/InitialCard.svelte';
	import { pickedState, sharedProps } from './state';
	import Checkbox from '$lib/Components/Checkbox.svelte';
	import Disclaimer from '$lib/Components/Disclaimer.svelte';
	import { CodeBlock } from '@skeletonlabs/skeleton';
	let state = 'start';
	let prevState = 'start';
	let checkboxData = [];
	export let data;

	const subscribe = pickedState.subscribe((value) => {
		state = value;
	});
	const subChecks = sharedProps.subscribe((value) => {
		checkboxData = value;
	});

	let csvData = data.data;
	let codeString = 'corpus-services';
	let checkboxNames = [];
	let tmpObject = {};
	csvData.forEach((element, index) => {
		if (element[9] != '' && element[9] != undefined && index != 0) {
			tmpObject = {
				id: element[8], // id in csv
				name: element[9], // name in csv
				tooltip: element[11], // tooltip in csv
				checked: false,
				visible: true,
				functionName: element[8],
				dataType: element[6],
				fixable: element[7],
				fixActivated: false,
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
	function createCodeString() {
		checkboxData.forEach((cb) => {
			if (cb.checked == true) {
				codeString += ' -c ' + cb.functionName + (cb.fixActivated == true ? ' -f' : '');
			}
		});
	}
	let checkboxPresets = [
		{
			name: 'HIAT-Check',
			visible: true,
			tooltip: 'tooltip für HIAT-Check',
			id: 'hiat-check',
			hasFunctionAttached: true,
			functionToRun: ['setPreset', 'hiat']
		},
		{
			name: 'GAT-Check',
			visible: true,
			tooltip: 'tooltip für GAT-Check',
			id: 'gat-check',
			hasFunctionAttached: true,
			functionToRun: ['setPreset', 'gat']
		},
		{
			name: 'Transkript-Check',
			visible: true,
			tooltip: 'tooltip für Transkript-Check',
			id: 'transkript-check',
			hasFunctionAttached: true,
			functionToRun: ['setPreset', 'transkript']
		},
		{
			name: 'Korpus-Check',
			visible: true,
			tooltip: 'tooltip für Korpus-Check',
			id: 'korpus-check',
			hasFunctionAttached: true,
			functionToRun: ['setPreset', 'korpus']
		},
		{
			name: 'Metadaten-Check',
			visible: true,
			tooltip: 'tooltip für Metadaten-Check',
			id: 'metadaten-check',
			hasFunctionAttached: true,
			functionToRun: ['setPreset', 'meta']
		},
		{
			name: 'HTML-Ansichten',
			visible: true,
			tooltip: 'tooltip für HTML-Ansichten',
			id: 'html-ansichten',
			hasFunctionAttached: true,
			functionToRun: ['setPreset', 'html']
		}
	];
</script>

<div class="container h-1/2 mx-auto flex justify-center items-center flex-wrap">
	<div class="text-center w-full space-y-5 p-4">
		<Heading headerText={state == 'initial value' || state == 'start' ? 'Corpus Services' : ''} headerSubtext={state == 'initial value' || state == 'start' ? 'Welche Dateien willst du bearbeiten?' : 'Welche funktionen möchtest du durchführen?'} />
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
				<Disclaimer content="Die hochgeladenen Daten werden nur im verarbeitungsprozess benutzt und nach Download komplett gelöscht." title="Datenschutz" color="secondary" />
			</div>
		</div>
	{:else if state == 'hiat' || state == 'formal' || state == 'segment' || state == 'coma-corpus' || state == 'coma-gesamt' || state == 'cmdi' || state == 'elan'}
		<div class="text-center w-full" transition:fly={{ y: 200, duration: 300 }}>
			<p>current state: {(prevState = state)}</p>
			<h3 class="">Mögliche presets</h3>
			<div class="w-full flex flex-wrap flex-row justify-center my-6" id="presets">
				{#each checkboxPresets as cbPreset}
					<Checkbox checkbox={cbPreset} cbSize="1/6" />
				{/each}
			</div>

			<Disclaimer content="Durch einen hover über die möglichkeiten, erhälst du informationen über die jeweillige Funktion" title="Information" />
			<div class="w-full flex flex-wrap flex-row justify-center my-6">
				<div class="flex flex-row flex-wrap justify-center text-center w-3/4" id="functionChecks">
					{#each checkboxNames as cb}
						<Checkbox checkbox={cb} cbSize="1/3" curState={state} />
					{/each}
				</div>
			</div>
		</div>
		<div class="w-full flex flex-wrap flex-row justify-center p-4 space-x-2">
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300" on:click={() => pickedState.set('start')}> Zurück </button>
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
				on:click={() => {
					prevState = state;
					pickedState.set('fixes');
				}}
			>
				Weiter
			</button>
		</div>
	{:else if state == 'fixes'}
		<div class="text-center w-full" transition:fly={{ y: 200, duration: 300 }}>
			<h3 class="p-4">Folgende ausgewählte möglichkeiten können zusätzlich einen "Fix" bekommen</h3>
			<p>Durch einen hover über die möglichkeiten, erhälst du informationen über die jeweillige Funktion</p>

			<div class="w-full flex flex-wrap flex-row justify-center mx-auto self-center">
				<div class="flex flex-row flex-wrap justify-center text-center w-3/4 mx-auto self-center my-5" id="functionChecks">
					{#each checkboxData as cb}
						{#if cb.checked == true && cb.fixable == 1}
							<Checkbox checkbox={cb} cbSize="1/3" curState={state} />
						{/if}
					{/each}
				</div>
			</div>
		</div>
		<div class="w-full flex flex-wrap flex-row justify-center p-4 space-x-2">
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300" on:click={() => pickedState.set(prevState)}> Zurück </button>
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
				on:click={() => {
					prevState = state;
					createCodeString();
					pickedState.set('end');
				}}
			>
				Weiter
			</button>
		</div>
	{:else if state == 'end'}
		<div class="text-center w-full" transition:fly={{ y: 200, duration: 300 }}>
			<h3 class="p-4">Hier kannst du die Dateien / Corpora Hochladen welche bearbeitet oder geprüft werden sollen</h3>
			<div class="flex flex-col flex-wrap justify-center p-4 space-y-2">
				<!-- <label for="exb-files">EXB/EXS Datei(en)</label> -->
				<div class="w-1/2 self-center flex flex-row justify-center mx-auto p-4 variant-ringed-primary">
					<p class="self-center font-bold px-4 w-1/4">EXB/EXS Datei(en)</p>
					<input class=" w-1/2" id="exb-files" type="file" multiple />
				</div>
				<div class="w-1/2 self-center flex flex-row justify-center mx-auto p-4 variant-ringed-primary">
					<p class="self-center font-bold px-4 w-1/4">COMA Datei(en)</p>
					<input class=" w-1/2" id="exb-files" type="file" multiple />
				</div>
				<div class="w-1/2 self-center flex flex-row justify-center mx-auto p-4 variant-ringed-primary">
					<p class="self-center font-bold px-4 w-1/4">Sonstige Datei(en)</p>
					<input class=" w-1/2" id="exb-files" type="file" multiple />
				</div>
				<div class="w-1/2 self-center flex flex-row justify-center mx-auto p-4 variant-ringed-primary">
					<p class="self-center font-bold px-4 w-1/4">Ordner als ZIP</p>
					<input class=" w-1/2" id="exb-files" type="file" />
				</div>
			</div>

			<div class="w-full flex flex-wrap flex-row justify-center mx-auto self-center">
				<Disclaimer content="Bei Rot angezeigten funktionen wird ein Fix angewendet" title="Deine ausgewählten Funktionen" color="warning" />
				<div class="flex flex-row flex-wrap justify-center text-center mx-auto self-center my-5" id="functionChecks">
					{#each checkboxData as cb}
						{#if cb.checked == true}
							<div class=" p-4 w-1/3 m-2 {cb.fixActivated == true ? 'variant-ghost-secondary' : 'variant-ghost-primary'}">
								<p>{cb.name}</p>
							</div>
						{/if}
					{/each}
				</div>
			</div>
			<div class="w-full flex flex-wrap flex-row justify-center mx-auto self-center">
				<h4 class="p-4">Generierter Code</h4>
				<CodeBlock code={codeString} />
			</div>
		</div>
		<div class="w-full flex flex-wrap flex-row justify-center p-4 space-x-2">
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300" on:click={() => pickedState.set(prevState)}> Zurück </button>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300" on:click={() => pickedState.set('end')}> Weiter </button>
		</div>
	{/if}
</div>
