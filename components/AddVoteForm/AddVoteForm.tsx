"use client"

import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, SetStateAction, useState } from "react"
import { AddVoteFormFields, addVoteSchema } from "@/utils/zodSchema"
import { addVote } from "./actions"
import { CountryCombobox } from "./CountryCombobox"
import { Country } from "@/app/generated/prisma"

function AddVoteForm({ countries }: { countries: Country[] }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
    reset,
  } = useForm<AddVoteFormFields>({
    resolver: zodResolver(addVoteSchema),
    defaultValues: {
      name: "",
      email: "",
      countryId: "",
    },
  })

  const onSubmit: SubmitHandler<AddVoteFormFields> = async (data) => {
    const result = await addVote(data)

    // set the server error response to local state managed by react-hook-form (setError)
    if (!result.success && result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        setError(field as keyof typeof data, { message })
      })
    }
    if (result.success) {
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      {/* NAME */}
      <div>
        <input
          {...register("name")}
          type="text"
          placeholder="Name"
          className="mt-1 text-lg block w-full rounded-md border border-gray-300 px-3 py-2"
          style={errors?.name && { border: "2px solid red" }}
        />

        {errors.name && (
          <p className="text-sm text-red-500 text-center mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="mt-1 text-lg block w-full rounded-md border border-gray-300 px-3 py-2"
          style={errors?.email && { border: "2px solid red" }}
        />

        {errors.email && (
          <p className="text-sm text-red-500 text-center mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* COUNTRY */}
      <div>
        <Controller
          control={control}
          name="countryId"
          render={({ field: { onChange, value } }) => (
            <CountryCombobox onChange={onChange} value={value} countries={countries} />
          )}
        />
        {errors.countryId && (
          <p className="text-sm text-red-500 text-center mt-1">{errors.countryId.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="ml-auto flex mt-12 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 disabled:bg-blue-300 cursor-pointer disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Loading..." : "Submit Vote"}
      </button>
    </form>
  )
}

export default AddVoteForm
