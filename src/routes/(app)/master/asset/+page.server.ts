import { db } from '$lib/server/db';
import { assetCategories } from '$lib/server/db/schema';
import { fail, error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import type { AssetCategories } from '$lib/types';
import type { Actions, ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async () => {
	const assetCategoryList: AssetCategories[] = await db.select().from(assetCategories);
	return {
		assetCategoryList
	};
};

export const actions: Actions = {
	create: async (event) => {
		const formData = await event.request.formData();
		const name = formData.get('name');

		const existing = await db
			.select({ id: assetCategories.id, name: assetCategories.name })
			.from(assetCategories)
			.where(eq(assetCategories.name, name as string));

		if (existing.length > 0) {
			return fail(400, { message: 'Category asset name already registered' });
		}

		try {
			await db.insert(assetCategories).values({
				name,
			} as AssetCategories);

		} catch (err) {
			console.error('Create error:', err);
			return error(500)
            
		}

		return { message: 'Create successful'};
	}
}