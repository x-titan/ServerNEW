import z from "zod"

export const UserSchema = z.object({
  id: z.number(),
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(32, "Username must not exceed 30 characters")
    .regex(/^[a-zA-Z0-9_]/),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters"),
  created_at: z.date(),
  updated_at: z.date()
})

export const UserIMAPSchema = z.object({
  id: z.number(),
  email: z.email(),
  imap_host: z.string(),
  imap_port: z.number(),
  imap_secure: z.boolean(),
  imap_username: z.string(),
  imap_password: z.string(),
})

/**
 * Public scheme
 * (without `password`, `created_at`, `updated_at`)
 */
export const PublicUserSchema = UserSchema.pick({
  id: true,
  username: true,
})

export type IUser = z.infer<typeof UserSchema>

/**
 * `IPublicUser = { username, id }`
 */
export type IPublicUser = z.infer<typeof PublicUserSchema>

export type IUserIMAP = z.infer<typeof UserIMAPSchema>
