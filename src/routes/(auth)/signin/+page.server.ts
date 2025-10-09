import { verify } from '@node-rs/argon2';
import { fail, redirect } from '@sveltejs/kit';
import { eq, or } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const identifier = (formData.get('identifier') as string)?.toLowerCase();
		const password = formData.get('password');

		if (!identifier || !password) {
			return fail(400, { message: 'Please fill in all fields' });
		}

		// cari user berdasarkan username atau email
		const [existingUser] = await db
			.select({
				id: users.id,
				username: users.username,
				email: users.email,
				passwordHash: users.passwordHash
			})
			.from(users)
			.where(
				or(eq(users.username, identifier.toLowerCase()), eq(users.email, identifier.toLowerCase()))
			);

		if (!existingUser) {
			return fail(400, { message: 'User not found' });
		}

		const isValidPassword = await verify(existingUser.passwordHash, password as string, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!isValidPassword) {
			return fail(400, { message: 'Incorrect password' });
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		return redirect(302, '/dashboard');
	}
};
