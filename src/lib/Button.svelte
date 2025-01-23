<script lang="ts">
	// todo: map variant
	let { title, variant, onclick }: { title: string; variant?: string; onclick: () => void } =
		$props();
</script>

<button
	type="button"
	class="btn btn-md variant-glass border border-primary-700 hover:variant-glass-primary hover:scale-105 hover:shadow-xl mr-2 mb-4 transition-all"
	{onclick}
>
	{title}
</button>
