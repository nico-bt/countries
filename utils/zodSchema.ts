import z from "zod"

export const addVoteSchema = z.object({
  email: z.email({ message: "Invalid email address" }).trim(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).trim(),
  countryId: z.string().min(1, "Choose a country"),
})

export type AddVoteFormFields = z.infer<typeof addVoteSchema>
