import { hash } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq, or } from 'drizzle-orm';
import type { Actions } from '@sveltejs/kit';
import type { User } from '$lib/types';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		const name = formData.get('name');
		const username = formData.get('username');
		const email = formData.get('email');
		const password = formData.get('password');


		// Validasi
		if (!validateUsername(username)) {
            return fail(400, { message: 'Invalid username' });
		}
        if (!validateEmail(email)) {
            return fail(400, { message: 'Invalid email format' });
        }
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password' });
		}

		const existingUser = await db
			.select({ id: user.id })
			.from(user)
			.where(or(eq(user.username, username as string), eq(user.email, email)));

		if (existingUser.length > 0) {
			return fail(400, { message: 'Username or email already registered' });
		}

		const userId = generateUserId();
		const passwordHash = await hash(password as string, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			await db.insert(user).values({
				id: userId,
				name,
				username: username.toLowerCase(),
				email: email.toLowerCase(),
				passwordHash
			} as User);

		} catch (err) {
			console.error('Signup error:', err);
			return error(500)
            
		}

		return redirect(302, '/signin');
	}
};

// === Helper Functions ===

function generateUserId() {
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	return encodeBase32LowerCase(bytes);
}

function validateUsername(username: unknown): username is string {
	return (
		typeof username === 'string' &&
		username.length >= 3 &&
		username.length <= 31 &&
		/^[a-z0-9_-]+$/.test(username)
	);
}

function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}

function validateEmail(email: unknown): email is string {
	if (typeof email !== 'string') return false;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
