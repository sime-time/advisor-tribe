import { z } from "zod/v4";
import { updateUser } from "~/db/queries/update/update-user";

const UserSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  email: z.email().optional(),
  linkName: z
    .string()
    .min(3, "Link name must have at least 3 characters")
    .max(150)
    .regex(/^[a-z0-9-]+$/i, "Link name can only contain letters, numbers, and -")
    .optional(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // Validate form data
    const validUser = UserSchema.parse({
      id: Number.parseInt(body.id),
      name: body.name,
      email: body.email,
      linkName: body.linkName,
    });

    // Update user with valid data
    const data = await updateUser(validUser);
    return data;
  }
  catch (error) {
    console.error("Update user error:", error);
    // Return any validation error
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        message: error.message,
      });
    }
    throw createError({
      statusCode: 500,
      message: "Failed to update user",
    });
  }
});
