<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	import Heading from '$lib/Components/Heading.svelte';
	import InitialCard from '$lib/Components/InitialCard.svelte';
	import { pickedState } from './state';
	import Checkbox from '$lib/Components/Checkbox.svelte';

	let state = 'start';

	const subscribe = pickedState.subscribe((value) => {
		state = value;
	});
</script>

<div class="container h-1/2 mx-auto flex justify-center items-center flex-wrap">
	<div class="text-center w-full space-y-5 p-4">
		<Heading
			headerText={state == 'initial value' || state == 'start' ? 'Willkommen' : ''}
			headerSubtext={state == 'initial value' || state == 'start'
				? 'Welche Dateien willst du bearbeiten?'
				: 'Welche funktionen möchtest du durchführen?'}
		/>
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
			<p>
				Durch einen hover über die möglichkeiten, erhälst du informationen über die jeweillige
				Funktion
			</p>
			<div class="w-full flex flex-wrap flex-row justify-center">
				<Checkbox />
			</div>
			<p>Hier findest kannst du auswählen was "gefixt" werden soll</p>
			<div class="w-full flex flex-wrap flex-row justify-center">
				<Checkbox />
			</div>
		</div>
	{/if}
</div>
