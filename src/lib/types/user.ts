import { users, sessions } from "$lib/server/db/schema";

export type Sessions = typeof sessions.$inferInsert;
export type Users = typeof users.$inferInsert;