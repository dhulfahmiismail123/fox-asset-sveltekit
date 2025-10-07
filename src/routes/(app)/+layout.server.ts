import type { ServerLoad } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const load: ServerLoad = async (event) => {
    if (!event.locals.user) {
        return redirect(302, '/signin');
    }
    return {};
};
