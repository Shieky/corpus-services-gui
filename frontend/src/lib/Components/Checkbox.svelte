<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { sharedProps } from '../../routes/state';
	let settings = 'settings';
	let checkboxes = [];
	export let numberOfChoices: number = 10;
	export let checkboxClasses: string = 'w-1/4';
	export let checkboxNames: any = [];
	//console.log(checkboxNames);
	let cbBind;
	//console.log(checkboxNames[2].name);

	/* check if checkboxNames is empty if not count */
	if (checkboxNames.length > 0) {
		numberOfChoices = checkboxNames.length;
	}

	export function getCheckboxNames() {
		return checkboxNames;
	}

	function randomNumber() {
		return Math.floor(Math.random() * 100000);
	}

	function setPreset(preset: string, checkstate: boolean) {
		let props = $sharedProps;
		let firstPropId = props[0].id;
		let event = new Event('change');
		let firstObj = document.getElementById(firstPropId + '-cb');
		let firstObjChecked;
		props.forEach((checkbox) => {
			if (checkbox.presets != undefined) {
				if (checkbox.presets['' + preset] != undefined && checkbox.presets['' + preset] == true) {
					if (checkbox.id == firstPropId) {
						firstObjChecked = checkstate == true ? true : false;
					}
					checkbox.checked = checkstate == true ? true : false;
				} else {
					/* 	if (checkbox.id == firstPropId) {
						firstObjChecked = false;
					}
					checkbox.checked = false;
					checkbox.check = false; */
				}
			}
		});
		firstObj.dispatchEvent(event);
		firstObj.checked = firstObjChecked;
		firstObj.dispatchEvent(event);
	}

	function checkFunc(cb) {
		if (cb.hasFunctionAttached) {
			cb.functionToRun[0] == 'setPreset' ? setPreset(cb.functionToRun[1], cb.checked) : null;
		}
	}
	//console.log(checkboxNames);

	for (let index: number = 1; index <= numberOfChoices; index++) {
		let id = checkboxNames[index - 1] != undefined ? checkboxNames[index - 1].id + randomNumber() || index : index;

		window[settings + id] = {
			event: 'hover',
			target: `tooltip-${id}`,
			placement: 'top'
		};
		checkboxes.push({
			id: id,
			name: ` ${checkboxNames[index - 1] != undefined ? checkboxNames[index - 1].name : '' || 'Checkbox ' + id}`,
			tooltip: `${checkboxNames[index - 1] != undefined ? checkboxNames[index - 1].tooltip : '' || 'Tooltip' + id}`,
			checked: false,
			dataPopup: `tooltip-${id}`,
			presets: checkboxNames[index - 1].presets,
			hasFunctionAttached: checkboxNames[index - 1].hasFunctionAttached || false,
			functionToRun: checkboxNames[index - 1].functionToRun || []
		});
	}
	sharedProps.set(checkboxes);
</script>

{#each checkboxes as checkbox, index (checkbox.id)}
	<label
		use:popup={window[settings + checkbox.id]}
		class="flex items-center justify-center space-x-2 {checkboxClasses} p-2 card-hover m-2 cursor-pointer text-center hover:bg-secondary-400
             {checkbox.checked ? 'bg-primary-500 outline outline-1 outline-white' : 'card'}"
	>
		{#if checkbox.hasFunctionAttached}
			<input type="checkbox" bind:checked={checkbox.checked} bind:this={cbBind} on:change={checkFunc(checkbox)} class="hidden" />
		{:else}
			<input id="{checkbox.id}-cb" type="checkbox" bind:checked={checkbox.checked} class="hidden" />
		{/if}
		<p class="text-center p-2">{checkbox.name}</p>
	</label>
	<div class="dark:bg-slate-600 bg-white p-4" data-popup={checkbox.dataPopup}>
		{checkbox.tooltip}

		<div class="arrow dark:bg-slate-600 bg-white" />
	</div>
{/each}
