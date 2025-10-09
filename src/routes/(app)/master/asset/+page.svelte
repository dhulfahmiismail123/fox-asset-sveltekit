<script lang="ts">
	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import DataTable from '$lib/components/data-table.svelte';
	import { assetCategoriesColumns } from '$lib/components/data-table-columns';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';

	import type { AssetCategories } from '$lib/types/asset';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { invalidateAll } from '$app/navigation';

	let { data }: { data: { assetCategoryList: AssetCategories[] } } = $props();

	const submitHandle: SubmitFunction = async () => {
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success(result.data?.message);
					await invalidateAll();
					break;
				case 'failure':
					toast.error(result.data?.message);
				case 'error':
					toast.error('An unexpected error occurred');
				default:
					break;
			}
		};
	};
</script>

<form method="post" action="?/create" use:enhance={submitHandle} class="flex items-end gap-3 pb-4">
	<Field.Field class="w-50">
		<Field.Label>Email or Username</Field.Label>
		<Input name="name" required />
	</Field.Field>
	<Button type="submit" class="w-20">Add</Button>
</form>

<DataTable data={data.assetCategoryList} columns={assetCategoriesColumns} />
