<script lang="ts">
	import PresetCards from '$lib/PresetCards.svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { checkboxNames } from '../../../states';
	export let data;
	let picekdPreset;
	$: {
		checkboxNames.update((content) => [...content, 'test']);
	}
	let infoTexte = {
		hiat: {
			title: 'HIAT-CHECK',
			content:
				'Die Vorauswahl HIAT-Check dient der Überprüfung und qualitativen Verbesserung von Transkripten, die in HIAT mit dem EXMARaLDA-Partitureditor erstellt worden sind. Im HIAT-Check sind alle Corpus Services-Funktionen zusammengefasst, die eine formale und inhaltlichen Prüfung von (HIAT)-Transkripten vornehmen. Transkripte, für die der HIAT-Check ausgewählt wird, werden mithilfe verschiedener Funktionen überprüft und teilweise korrigiert. Es werden sowohl Funktionen zur strukturellen (Alignierung, Zeitumbrüche etc.) und formalen Prüfung (Spuren, Dateipfade etc.) angewendet als auch Funktionen zur Überprüfung der Transkription (Symbole, Schriftsystem, Leerzeichen etc.) und der Transkriptionskonventionen (HIAT). Einfache Fehler (bspw. Segmentierungsfehler) werden automatisch korrigiert. Für Fehler, die manuell korrigiert werden müssen (bspw. verbotene Symbole), wird ein Report ausgegeben.'
		},
		gat: {
			title: 'GAT-CHECK',
			content:
				'Die Vorauswahl GAT-Check dient der Überprüfung und qualitativen Verbesserung von Transkripten, die in GAT2 mit dem EXMARaLDA-Partitureditor erstellt worden sind. Im GAT-Check sind alle Corpus Services-Funktionen zusammengefasst, die eine formale und inhaltlichen Prüfung von (GAT2)-Transkripten vornehmen. Transkripte, für die der GAT-Check ausgewählt wird, werden mithilfe verschiedener Funktionen überprüft und teilweise korrigiert. Es werden sowohl Funktionen zur strukturellen (Alignierung, Zeitumbrüche etc.) und formalen Prüfung (Spuren, Dateipfade etc.) angewendet als auch Funktionen zur Überprüfung der Transkription (Symbole, Schriftsystem, Leerzeichen etc.) und der Transkriptionskonventionen (HIAT). Einfache Fehler (bspw. Segmentierungsfehler) werden automatisch korrigiert. Für Fehler, die manuell korrigiert werden müssen (bspw. verbotene Symbole), wird ein Report ausgegeben.'
		},
		transkript: {
			title: 'TRANSKRIPT-CHECK',
			content:
				'Die Vorauswahl Transkript-Check dient der Überprüfung und qualitativen Verbesserung von Transkripten, die mit dem EXMARaLDA-Partitureditor erstellt worden sind. Im Transkript-Check sind alle Corpus Services-Funktionen zusammengefasst, die eine formale und inhaltlichen Prüfung von Transkripten unabhängig von den verwendeten Transkriptionskonventionen vornehmen. Transkripte, für die der Transkript-Check ausgewählt wird, werden mithilfe verschiedener Funktionen überprüft und teilweise korrigiert. Es werden sowohl Funktionen zur strukturellen (Alignierung, Zeitumbrüche etc.) und formalen Prüfung (Spuren, Dateipfade etc.) angewendet als auch Funktionen zur Überprüfung der Transkription (Symbole, Schriftsystem, Leerzeichen etc.). Einfache Fehler (bspw. Segmentierungsfehler) werden automatisch korrigiert. Für Fehler, die manuell korrigiert werden müssen (bspw. verbotene Symbole), wird ein Report ausgegeben.'
		},
		html: {
			title: 'HTML-CHECK',
			content:
				'Die Vorauswahl HTML-Ansichten umfasst alle Funktionen, die HMTL-Ansichten aus EXMARaLDA-Dateien erstellen. Die erzeugten Ansichten sind filterbar und bieten eine verbesserte Übersicht oder Visualisierung verschiedener Dateiinhalte.'
		},
		metadaten: {
			title: 'METADATEN-CHECK',
			content: ''
		},
		korpus: {
			title: 'KORPUS-CHECK',
			content:
				'Die Korpus-Aufbereitung umfasst alle Funktionen, die der Verbesserung der Transkriptqualität dienen oder formale Prüfungen und Korrekturen des Korpusmanagers (COMA) enthalten. Die Korpus-Aufbereitung hilft bei der Qualitätsprüfung vor der Veröffentlichung eines Korpus. Einfache Fehler (bspw. Segmentierungsfehler in den Transkripten oder absolute Dateipfade in der COMA-Datei) werden automatisch korrigiert. Fehler, für die eine manuelle Korrektur erforderlich ist, werden in einem Report dokumentiert.'
		}
	};

	function selectAll(presetName: string) {
		data.data.forEach((item) => {
			if (item.presets[presetName] == true) item.checked = true;
		});
		data.data = [...data.data]; // Reassign to ensure Svelte's reactivity
	}
	function deselectAll() {
		data.data.forEach((item) => (item.checked = false));
		data.data = [...data.data]; // Reassign to ensure Svelte's reactivity
	}
</script>

<div
	class="flex flex-col flex-wrap justify-center items-center w-full space-y-10 my-10"
	transition:slide|global={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}
>
	<h1 class="h1 p-4 w-full text-center">Welche Funktionen möchtest du auswählen?</h1>
	<h5 class="h5 p-4 w-1/2 shadow-md variant-glass-tertiary text-center border border-secondary-400">
		Über die Buttons kannst du den vorausgewählten Funktionssets wechseln oder die Auswahl
		zurücksetzen. Bei einer individuellen Funktionsauswahl kann dir die Vorsortierung der Funktionen
		helfen. Über das (i) hinter den Funktionen kannst du dir eine Beschreibung anzeigen lassen. Alle
		Funktionen können entweder eine Prüfung durchführen und einen Report dazu ausgeben oder eine
		Visualisierung (o.ä.) erstellen. Einige Funktionen können zusätzlich Korrekturen („Fixes“)
		durchführen. Ob eine hier angewählte Funktion nur eine Prüfung oder auch eine Korrektur
		durchführen soll, kann im nächsten Schritt ausgewählt werden.
	</h5>
</div>
<div class="flex flex-col justify-center w-full space-y-5">
	<div class=" p-4 w-1/2 self-center border-b border-secondary-400">
		<h3 class="h3 text-center">Presets</h3>
	</div>
	<div class="flex flex-row flex-wrap justify-center self-center w-full rounded-2xl">
		<button
			type="button"
			class="btn btn-md variant-glass border border-primary-700 hover:variant-glass-primary hover:scale-105 hover:shadow-xl mr-2 mb-4 transition-all"
			on:click={() => selectAll('hiat')}>HIAT-CHECK</button
		>
		<button
			type="button"
			class="btn btn-md variant-glass border border-primary-700 hover:variant-glass-primary hover:scale-105 hover:shadow-xl mr-2 mb-4 transition-all"
			on:click={() => selectAll('gat')}>GAT-CHECK</button
		>
		<button
			type="button"
			class="btn btn-md variant-glass border border-primary-700 hover:variant-glass-primary hover:scale-105 hover:shadow-xl mr-2 mb-4 transition-all"
			on:click={() => selectAll('transkript')}>TRANSKRIPT-CHECK</button
		>
		<button
			type="button"
			class="btn btn-md variant-glass border border-primary-700 hover:variant-glass-primary hover:scale-105 hover:shadow-xl mr-2 mb-4 transition-all"
			on:click={() => selectAll('korpus')}>KORPUS-AUSBEREITUNG</button
		>
		<button
			type="button"
			class="btn btn-md variant-glass border border-primary-700 hover:variant-glass-primary hover:scale-105 hover:shadow-xl mr-2 mb-4 transition-all"
			on:click={() => selectAll('meta')}>METADATEN-CHECK</button
		>
		<button
			type="button"
			class="btn btn-md variant-glass border border-primary-700 hover:variant-glass-primary hover:scale-105 hover:shadow-xl mr-2 mb-4 transition-all"
			on:click={() => selectAll('html')}>HTML-ANSICHTEN</button
		>
		<div class="w-full flex flex-col justify-center">
			<button
				type="button"
				class="w-max self-center btn btn-md variant-glass border border-secondary-500 hover:variant-glass-secondary hover:scale-105 hover:shadow-xl mr-2 mb-4 transition-all"
				on:click={() => deselectAll()}>AUSWAHL ZURÜCKSETZEN</button
			>
		</div>
	</div>
</div>
<form action="/functions/fix?/fix" class="flex flex-col" method="post">
	<div class="grid grid-cols-6 justify-center gap-3 md:p-4 mx-auto self-center">
		<div class="col-span-full md:col-span-4 md:col-start-2 col-start-1 row-start-1 row-span-2">
			<PresetCards
				data={data.data}
				header="Transkript-Funktionen (EXB, EXS)"
				dataType={['BASICTRANSCRIPTIONDATA', 'SEGMENTEDTRANSCRIPTIONDATA']}
				modalContent={infoTexte.hiat}
				comparingFunction={data.params.function_name}
			/>
		</div>
		<div class="col-span-full md:col-span-4 md:col-start-2 col-start-1 row-start-3 row-span-2">
			<PresetCards
				data={data.data}
				header="Korpusmanager-Funktionen (COMA)"
				dataType={['COMADATA']}
				modalContent={infoTexte.gat}
				comparingFunction={data.params.function_name}
			/>
		</div>
		<div class="col-span-full md:col-span-4 md:col-start-2 col-start-1 row-start-5 row-span-2">
			<PresetCards
				data={data.data}
				header="Metadaten-Funktionen (CMDI)"
				dataType={['CMDIDATA']}
				modalContent={infoTexte.transkript}
				comparingFunction={data.params.function_name}
			/>
		</div>
		<div class="col-span-full md:col-span-4 md:col-start-2 col-start-1 row-start-7 row-span-2">
			<PresetCards
				data={data.data}
				header="Andere (div.)"
				dataType={['GENERAL', 'UNSPECIFIEDXMLDATA']}
				modalContent={infoTexte.html}
				comparingFunction={data.params.function_name}
			/>
		</div>
	</div>
	<button
		type="submit"
		class="btn btn-md variant-filled-primary hover:variant-filled-surface hover:scale-105 hover:shadow-xl w-1/2 self-center transition-all duration-300 ease-in-out m-8"
		>Weiter</button
	>
</form>
