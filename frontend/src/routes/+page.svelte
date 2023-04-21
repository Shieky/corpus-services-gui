<script lang="ts">
	import Heading from '$lib/Components/Heading.svelte';
	import InitialCard from '$lib/Components/InitialCard.svelte';
	import { pickedState, getPickState } from './state';

	let state = 'start';

	const subscribe = pickedState.subscribe((value) => {
		state = value;
	});
</script>

<div class="container h-full mx-auto flex justify-center items-center flex-wrap">
	<div class="text-center w-full space-y-5">
		<Heading
			headerText={state == 'initial value' ? 'Willkommen' : 'Du hast ' + state + ' ausgewählt'}
			headerSubtext={state == 'initial value'
				? 'Welche Dateien willst du bearbeiten?'
				: state == 'formal'
				? 'Formal transkript'
				: state == 'hiat'
				? 'hiat transkript'
				: state == 'segment'
				? 'segment'
				: state == 'coma-corpus'
				? 'coma-corpus datei'
				: state}
		/>
		<hr class="border border-white w-full" />
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
</div>
