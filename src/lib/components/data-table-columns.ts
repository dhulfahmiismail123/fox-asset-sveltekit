import type { AssetCategories } from '$lib/types';
import type { ColumnDef } from '@tanstack/table-core';

export const assetCategoriesColumns: ColumnDef<AssetCategories>[] = [
	{
		accessorKey: 'name',
		header: 'Name'
	},
];
