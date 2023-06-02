<!--!!! NEEDS REFACTORING !!!-->
<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { sharedProps } from '../../routes/state';

	export let checkbox;
	export let cbSize = 'w-1/2';
	export let curState = 'start';
	checkbox.id = checkbox.id + randomNumber();

	const popupHover: PopupSettings = {
		event: 'hover',
		target: checkbox.id,
		placement: 'top'
	};
	let cbBind;

	function randomNumber() {
		return Math.floor(Math.random() * 100000);
	}

	/* For reactive statements to work, needs subscribe?
	 *
	 * Workaround for the time being:
	 *
	 */

	function setPreset(preset: string, checkstate: boolean) {
		let props = $sharedProps;
		console.log(props);

		props.forEach((checkbox) => {
			if (checkbox.presets != undefined) {
				let cbLabel = document.getElementById(checkbox.id + '-label');
				if (checkbox.presets['' + preset] != undefined && checkbox.presets['' + preset] == true) {
					console.log(checkbox);
					checkbox.checked = checkstate == true ? true : false;
					let cb = document.getElementById(checkbox.id + '-cb');

					cb.checked = checkstate == true ? true : false;
					/* add classes to cb */
					if (cb.checked == true) {
						cbLabel.classList.add('variant-ghost-primary');
						cbLabel.classList.remove('card');
					} else {
						cbLabel.classList.add('card');
						cbLabel.classList.remove('variant-ghost-primary');
					}
				} else {
					/* 					cbLabel.classList.add('hidden'); */
				}
			}
		});
	}

	function checkFunc(cb) {
		if (cb.hasFunctionAttached) {
			cb.functionToRun[0] == 'setPreset' ? setPreset(cb.functionToRun[1], cb.checked) : null;
		}
	}
	if (checkbox.presets != undefined && curState != 'fixes') {
		sharedProps.update((content) => [...content, checkbox]);
	}
</script>

<div class="w-{cbSize}">
	<label
		id="{checkbox.id}-label"
		use:popup={popupHover}
		class=" p-2 card-hover m-2 cursor-pointer text-center hover:bg-secondary-400 h-20 justify-center self-center
			 {curState != 'fixes' ? (checkbox.checked ? 'variant-ghost-primary ' : 'card') : checkbox.fixActivated ? 'variant-ghost-primary' : 'card'}"
	>
		{#if checkbox.hasFunctionAttached}
			<input id="{checkbox.id}-cb" type="checkbox" bind:checked={checkbox.checked} on:change={checkFunc(checkbox)} class="hidden" />
		{:else if curState != 'fixes'}
			<input id="{checkbox.id}-cb" type="checkbox" bind:this={cbBind} bind:checked={checkbox.checked} class="hidden" />
		{:else}
			<input id="{checkbox.id}-cb" type="checkbox" bind:this={cbBind} bind:checked={checkbox.fixActivated} class="hidden" />
		{/if}
		<p class="text-center p-2">{checkbox.name}</p>
	</label>
	<div class="variant-filled-primary p-5" data-popup={checkbox.id}>
		{checkbox.tooltip}

		<div class="arrow variant-filled-primary" />
	</div>
</div>
