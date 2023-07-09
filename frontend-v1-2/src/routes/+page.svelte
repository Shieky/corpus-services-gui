<script lang="ts">
	import Card from '$lib/Card.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="flex flex-col flex-wrap justify-center items-center">
	<h1 class="h1 p-4">Was möchtest du machen?</h1>
	<h5 class="h5 p-4 w-1/2 border border-dashed border-primary-500 text-center">
		Die Corpus Services umfassen viele verschiedenen Funktionenzur Prüfungund Aufbereitung von
		Transkripten, Metadaten und Korpora. Für gängige Use Cases kann eine voreingestellte Auswahl
		genutzt werden. Alternativ können alle Funktionenauch individuell ausgewählt werden <br /> ("Eigene
		Funktionsauswahl").
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
</div>
<div class="grid col-auto row-auto justify-center gap-3 md:p-4">
	<div class="col-span-2 col-start-1 row-start-1 row-span-2">
		<Card
			cardHeader="HIAT-CHECK"
			cardBody="HIAT-EXMARaLDA Transkript(e) strukturell und auf HIAT-Konventionen prüfen"
			cardFooterLink="functions/hiat"
		/>
	</div>
	<div class="col-span-2 col-start-4 row-start-1 row-span-2">
		<Card
			cardHeader="GAT-CHECK"
			cardBody="GAT-EXMARaLDA Transkript(e) strukturell und aufGAT-Konventionen prüfen"
			cardFooterLink="functions/gat"
		/>
	</div>
	<div class="col-span-2 col-start-1 row-start-3 row-span-6">
		<Card
			cardHeader="TRANSKRIPT-CHECK"
			cardBody="EXMARaLDA-Transkripteformal prüfen"
			cardFooterLink="functions/transkript"
		/>
	</div>
	<div class="col-span-2 col-start-4 row-start-3 row-span-6">
		<Card
			cardHeader="METADATEN-CHECK"
			cardBody="Korpus aufbereiten und bereinigen"
			cardFooterLink="functions/metadaten"
		/>
	</div>
</div>
