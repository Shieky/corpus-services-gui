<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	export let popupTarget: string = 'tooltip-1';
	let popupSettings: PopupSettings = {
		event: 'hover',
		target: popupTarget
	};
	function returnPopupSettings(): PopupSettings {
		return popupSettings;
	}
</script>
