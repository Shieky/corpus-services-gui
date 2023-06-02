import { writable } from 'svelte/store';

export const pickedState = writable('initial value');

export const sharedProps = writable([]);

export function setPickedState(value: string) {
	pickedState.update(() => value);
}
export function resetSharedProps() {
	sharedProps.update(() => []);
}

export function getPickState() {
	pickedState.subscribe((value) => {
		console.log(value);
	});
}
