<script>
	import PresetCards from '$lib/PresetCards.svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { checkboxNames } from '../../../states';
	export let data;
	let picekdPreset;
	console.log(data);
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
</script>

<div
	class="flex flex-col flex-wrap justify-center items-center"
	transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}
>
	<h1 class="h1 p-4">Welche Funktionen möchtest du durchführen?</h1>
	<h5 class="h5 p-4 w-1/2 border border-dashed border-primary-500 text-center">
		Über den <b class="font-bold underline">Info-Button</b> kannst du dir eine Beschreibung der
		presets anzeigen lassen.<br />
		<sup
			>Durch einen hover über die möglichkeiten, erhälst du informationen über die jeweillige
			Funktion</sup
		>
	</h5>
</div>
<button class="btn" on:click={() => console.log($checkboxNames)}> CONSOLELOG </button>
<form action="fix?/fix" class="flex flex-col" method="post">
	<div class="grid grid-cols-6 justify-center gap-3 md:p-4 mx-auto self-center">
		<div class="col-span-full md:col-span-4 md:col-start-2 col-start-1 row-start-1 row-span-2">
			<PresetCards
				data={data.data}
				header="HIAT-CHECK"
				dataType="hiat"
				modalContent={infoTexte.hiat}
				isInPickedPreset={data.params.function_name == 'hiat' ? true : false}
			/>
		</div>
		<div class="col-span-full md:col-span-4 md:col-start-2 col-start-1 row-start-3 row-span-2">
			<PresetCards
				data={data.data}
				header="GAT-CHECK"
				dataType="gat"
				modalContent={infoTexte.gat}
				isInPickedPreset={data.params.function_name == 'gat' ? true : false}
			/>
		</div>
		<div class="col-span-full md:col-span-4 md:col-start-2 col-start-1 row-start-5 row-span-2">
			<PresetCards
				data={data.data}
				header="TRANSKRIPT-CHECK"
				dataType="transkript"
				modalContent={infoTexte.transkript}
				isInPickedPreset={data.params.function_name == 'transkript' ? true : false}
			/>
		</div>
		<div class="col-span-full md:col-span-4 md:col-start-2 col-start-1 row-start-7 row-span-2">
			<PresetCards
				data={data.data}
				header="HTML-CHECK"
				dataType="html"
				modalContent={infoTexte.html}
				isInPickedPreset={data.params.function_name == 'html' ? true : false}
			/>
		</div>
		<div class="col-span-full md:col-span-4 md:col-start-2 col-start-1 row-start-9 row-span-2">
			<PresetCards
				data={data.data}
				header="KORPUS-CHECK"
				dataType="korpus"
				modalContent={infoTexte.korpus}
				isInPickedPreset={data.params.function_name == 'korpus' ? true : false}
			/>
		</div>
		<div class="col-span-full md:col-span-4 md:col-start-2 col-start-1 row-start-11 row-span-2">
			<PresetCards
				data={data.data}
				header="META-CHECK"
				dataType="meta"
				isInPickedPreset={data.params.function_name == 'meta' ? true : false}
			/>
		</div>
	</div>
	<button
		type="submit"
		class="btn btn-lg variant-filled hover:variant-filled-primary hover:scale-105 hover:shadow-xl w-1/2 self-center transition-all duration-300 ease-in-out m-8"
		>Weiter</button
	>
</form>
