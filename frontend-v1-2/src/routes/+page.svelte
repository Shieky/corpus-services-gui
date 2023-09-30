<script lang="ts">
	import Card from '$lib/Card.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="flex flex-col flex-wrap justify-center items-center p-5 space-y-10">
	<h1 class="h1 p-4 w-full text-center">Corpus Services</h1>
	<h5 class="h5 p-4 w-1/2 variant-glass-tertiary text-center border border-secondary-400">
		Die Corpus Services verfassen viele verschiedenen Funktionen zur Prüfung und Aufbereitung von
		Transkripten, Korpora und Metadaten. Funktionen können einzeln angewendet oder
		aufeinanderfolgend ausgeführt werden. Es besteht die Möglichkeit eine Vorauswahl zu nutzen
		(HIAT-Check, GAT-Check, Transkript-Check, Metadaten-Check) oder die Funktionen individuell
		auszuwählen (Eigene Auswahl). Der Großteil der Corpus Services-Funktionen würde für EXB-, EXS-
		und COMA-Dateien entwickelt und kann Prüfungen, Visualisierungen und teilweise auch Korrekturen
		durchführen.
	</h5>
	<aside class="alert variant-ghost-error m-4">
		<div class="alert-message">
			<h3 class="h3 text-center">Datenschutzhinweis</h3>
			<p>
				Die hochgeladenen Daten werden nur im verarbeitungsprozess benutzt und nach Download
				komplett gelöscht.
			</p>
		</div>
	</aside>
	<h2 class="h1 p-4">Was möchtest du machen?</h2>
</div>
<div class="grid col-auto row-auto justify-center gap-3 md:p-4">
	<div class="col-span-2 col-start-1 row-start-1 row-span-2">
		<Card
			cardHeader="HIAT-CHECK"
			cardBody="HIAT-EXMARaLDA Transkript(e) strukturell und auf HIAT-Konventionen prüfen"
			cardFooterLink="functions/hiat"
			modalContent={{
				title: 'HIAT-CHECK',
				content:
					'Die Vorauswahl HIAT-Check dient der Überprüfung und qualitativen Verbesserung von Transkripten, die in HIAT mit dem EXMARaLDA-Partitureditor erstellt worden sind. Im HIAT-Check sind alle Corpus Services-Funktionen zusammengefasst, die eine formale und inhaltlichen Prüfung von (HIAT)-Transkripten vornehmen. Transkripte, für die der HIAT-Check ausgewählt wird, werden mithilfe verschiedener Funktionen überprüft und teilweise korrigiert. Es werden sowohl Funktionen zur strukturellen (Alignierung, Zeitumbrüche etc.) und formalen Prüfung (Spuren, Dateipfade etc.) angewendet als auch Funktionen zur Überprüfung der Transkription (Symbole, Schriftsystem, Leerzeichen etc.) und der Transkriptionskonventionen (HIAT). Einfache Fehler (bspw. Segmentierungsfehler) werden automatisch korrigiert. Für Fehler, die manuell korrigiert werden müssen (bspw. verbotene Symbole), wird ein Report ausgegeben.'
			}}
		/>
	</div>
	<div class="col-span-2 col-start-4 row-start-1 row-span-2">
		<Card
			cardHeader="GAT-CHECK"
			cardBody="GAT-EXMARaLDA Transkript(e) strukturell und aufGAT-Konventionen prüfen"
			cardFooterLink="functions/gat"
			modalContent={{
				title: 'GAT-CHECK',
				content:
					'Die Vorauswahl GAT-Check dient der Überprüfung und qualitativen Verbesserung von Transkripten, die in GAT2 mit dem EXMARaLDA-Partitureditor erstellt worden sind. Im GAT-Check sind alle Corpus Services-Funktionen zusammengefasst, die eine formale und inhaltlichen Prüfung von (GAT2)-Transkripten vornehmen. Transkripte, für die der GAT-Check ausgewählt wird, werden mithilfe verschiedener Funktionen überprüft und teilweise korrigiert. Es werden sowohl Funktionen zur strukturellen (Alignierung, Zeitumbrüche etc.) und formalen Prüfung (Spuren, Dateipfade etc.) angewendet als auch Funktionen zur Überprüfung der Transkription (Symbole, Schriftsystem, Leerzeichen etc.) und der Transkriptionskonventionen (HIAT). Einfache Fehler (bspw. Segmentierungsfehler) werden automatisch korrigiert. Für Fehler, die manuell korrigiert werden müssen (bspw. verbotene Symbole), wird ein Report ausgegeben.'
			}}
		/>
	</div>
	<div class="col-span-2 col-start-1 row-start-3 row-span-6">
		<Card
			cardHeader="TRANSKRIPT-CHECK"
			cardBody="EXMARaLDA-Transkripte inhaltlich und formal prüfen"
			cardFooterLink="functions/transkript"
			modalContent={{
				title: 'GAT-CHECK',
				content:
					'Die Vorauswahl Transkript-Check dient der Überprüfung und qualitativen Verbesserung von Transkripten, die mit dem EXMARaLDA-Partitureditor erstellt worden sind. Im Transkript-Check sind alle Corpus Services-Funktionen zusammengefasst, die eine formale und inhaltlichen Prüfung von Transkripten unabhängig von den verwendeten Transkriptionskonventionen vornehmen. Transkripte, für die der Transkript-Check ausgewählt wird, werden mithilfe verschiedener Funktionen überprüft und teilweise korrigiert. Es werden sowohl Funktionen zur strukturellen (Alignierung, Zeitumbrüche etc.) und formalen Prüfung (Spuren, Dateipfade etc.) angewendet als auch Funktionen zur Überprüfung der Transkription (Symbole, Schriftsystem, Leerzeichen etc.). Einfache Fehler (bspw. Segmentierungsfehler) werden automatisch korrigiert. Für Fehler, die manuell korrigiert werden müssen (bspw. verbotene Symbole), wird ein Report ausgegeben.'
			}}
		/>
	</div>
	<div class="col-span-2 col-start-1 row-start-8 row-span-6">
		<Card
			cardHeader="KORPUS-AUFBEREITUNG"
			cardBody="Korpus Aufbereiten und bereinigen"
			cardFooterLink="functions/korpus"
			modalContent={{
				title: 'KORPUS-AUFBEREITUNG',
				content:
					'Die Korpus-Aufbereitung umfasst alle Funktionen, die der Verbesserung der Transkriptqualität dienen oder formale Prüfungen und Korrekturen des Korpusmanagers (COMA) enthalten. Die Korpus-Aufbereitung hilft bei der Qualitätsprüfung vor der Veröffentlichung eines Korpus. Einfache Fehler (bspw. Segmentierungsfehler in den Transkripten oder absolute Dateipfade in der COMA-Datei) werden automatisch korrigiert. Fehler, für die eine manuelle Korrektur erforderlich ist, werden in einem Report dokumentiert.'
			}}
		/>
	</div>
	<div class="col-span-2 col-start-4 row-start-3 row-span-6">
		<Card
			cardHeader="HTML-ANSICHTEN"
			cardBody="EXMARaLDA-Transkripte in HTML-Ansichten umwandeln"
			cardFooterLink="functions/html"
			modalContent={{
				title: 'HTML-ANSICHTEN',
				content:
					'Die Vorauswahl HTML-Ansichten umfasst alle Funktionen, die HMTL-Ansichten aus EXMARaLDA-Dateien erstellen. Die erzeugten Ansichten sind filterbar und bieten eine verbesserte Übersicht oder Visualisierung verschiedener Dateiinhalte.'
			}}
		/>
	</div>
	<div class="col-span-2 col-start-4 row-start-8 row-span-6">
		<Card
			cardHeader="METADATEN-CHECK"
			cardBody="Metadaten prüfen und korrigieren"
			cardFooterLink="functions/meta"
			modalContent={{
				title: 'METADATEN-CHECK',
				content: ''
			}}
		/>
	</div>
	<div class="col-span-6 col-start-1 row-start-8 row-span-6">
		<Card
			cardHeader="EIGENE AUSWAHL"
			cardBody="Funktionen individuell und ohne Vorauswahl auswählen"
			cardFooterLink="functions/individual"
			modalContent={{
				title: 'Eigene Auswahl',
				content: ''
			}}
		/>
	</div>
</div>
