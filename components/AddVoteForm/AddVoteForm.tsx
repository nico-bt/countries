"use client"

import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AddVoteFormFields, addVoteSchema } from "@/utils/zodSchema"
import { addVote } from "./actions"
import { CountryCombobox } from "./CountryCombobox"
import { Country } from "@/app/generated/prisma"

function AddVoteForm({ countries }: { countries: Country[] }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
    control,
    reset,
  } = useForm<AddVoteFormFields>({
    mode: "onChange",
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
    <div className="rounded-[20px] bg-white px-4 py-8 card-shadow">
      <h1 className="text-sm font-bold mb-3.5">Vote for your favorite country</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
        className="flex flex-col md:flex-row gap-3 items-start"
      >
        {/* NAME */}
        <div className="flex-1">
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="w-full rounded-md border px-3.5 py-[7px]"
            style={errors?.name && { border: "2px solid red" }}
          />

          <p className="text-sm text-red-500 text-center min-h-8">{errors?.name?.message}</p>
        </div>

        {/* EMAIL */}
        <div className="flex-1">
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full rounded-md border px-3.5 py-[7px]"
            style={errors?.email && { border: "2px solid red" }}
          />

          <p className="text-sm text-red-500 text-center min-h-8">{errors?.email?.message}</p>
        </div>

        {/* COUNTRY */}
        <div className="flex-1">
          <Controller
            control={control}
            name="countryId"
            render={({ field: { onChange, value } }) => (
              <CountryCombobox onChange={onChange} value={value} countries={countries} />
            )}
          />

          <p className="text-sm text-red-500 text-center min-h-8">{errors?.countryId?.message}</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="col-auto w-30 flex bg-black text-white justify-center py-2 rounded items-center hover:bg-slate-900 disabled:bg-[#ededed] disabled:text-[#a3a3a3] cursor-pointer disabled:cursor-not-allowed font-semibold text-sm"
        >
          {isSubmitting ? "Loading..." : "Submit Vote"}
        </button>
      </form>
    </div>
  )
}

export default AddVoteForm
