<script lang="ts">
	export let headerText: string;
	export let headerSubtext: string;
	export let additionalClasses: string = '';
</script>

<div class="font-light text-base w-full {additionalClasses}">
	<h1>{headerText}</h1>
	<br />
	<h2>{headerSubtext}</h2>
</div>
