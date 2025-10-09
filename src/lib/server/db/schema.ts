import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	username: text('username').notNull().unique(),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	createdAt: integer("created_at", { mode: "timestamp"}).$defaultFn(() => new Date(Date.now())),
	updatedAt: integer("update_At", { mode: "timestamp"}).$defaultFn(() => new Date(Date.now())),
});

export const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const assetCategories = sqliteTable('asset_categories', {
	id: integer('id').primaryKey(),
	name: text("name").unique().notNull(),
	createdAt: integer("created_at", { mode: "timestamp"}).$defaultFn(() => new Date(Date.now())),
	updatedAt: integer("update_At", { mode: "timestamp"}).$defaultFn(() => new Date(Date.now())),
});
