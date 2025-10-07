import { user, session } from "$lib/server/db/schema";

export type Session = typeof session.$inferInsert;
export type User = typeof user.$inferInsert;