"use server"

import { createUser, getUserByEmail } from "@/lib/users"
import { createVote } from "@/lib/votes"
import { AddVoteFormFields, addVoteSchema } from "@/utils/zodSchema"
import { revalidatePath } from "next/cache"
import z from "zod"

export type ActionResponse = {
  success: boolean
  errors: {
    email?: string
    name?: string
    countryId?: string
    root?: string
  } | null
  data?: {
    name: string
    email: string
    countryId: string
  }
}

export async function addVote(data: AddVoteFormFields): Promise<ActionResponse> {
  // Validate input
  const result = addVoteSchema.safeParse(data)

  if (!result.success) {
    const fieldErrors = z.flattenError(result.error).fieldErrors
    const normalizedErrors = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0] ?? "Invalid input"])
    )

    return {
      success: false,
      errors: normalizedErrors,
      data,
    }
  }

  const { name, email, countryId } = result.data

  try {
    const userAllreadyExists = await getUserByEmail(email)

    if (userAllreadyExists) {
      return {
        success: false,
        errors: { email: "Email already voted" },
        data: { email, name, countryId },
      }
    }

    const newUser = await createUser({ name, email })

    await createVote({ userId: newUser.id, countryId: parseInt(countryId) })

    revalidatePath("/")

    return {
      success: true,
      errors: null,
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      errors: {
        root: "There was an error trying to access the database, please try again",
      },
      data: { email, name, countryId },
    }
  }
}
