<script lang="ts">
	export let label: string = 'Datei(en)';
	export let inputName: string = 'file';
</script>

<div class="w-3/12 card rounded-md">
	<div class="card-body overflow-hidden flex flex-col space-y-5 justify-center items-center">
		<div class="w-full variant-glass-primary rounded-md">
			<p class="self-center font-bold px-4 w-full text-xl p-4 text-center">
				{label}
			</p>
		</div>
		<div class="w-full p-4 pb-8">
			<input class="" id={inputName} name={inputName} type="file" multiple />
		</div>
	</div>
</div>
