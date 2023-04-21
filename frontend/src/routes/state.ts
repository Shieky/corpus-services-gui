import { writable } from 'svelte/store';

export const pickedState = writable('initial value');

export function setPickedState(value: string) {
	pickedState.update(() => value);
}

export function getPickState() {
	pickedState.subscribe((value) => {
		console.log(value);
	});
}
