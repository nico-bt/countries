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
        <div className="flex-1 w-full max-w-[500px] mx-auto">
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className={`w-full border px-3.5 py-[7px] ${errors?.name && "border-2 border--danger"}`}
          />

          <p className="text-sm text--danger text-center min-h-8">{errors?.name?.message}</p>
        </div>

        {/* EMAIL */}
        <div className="flex-1 w-full max-w-[500px] mx-auto">
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className={`w-full max-w-[500px] mx-auto border px-3.5 py-[7px] ${
              errors?.email && "border-2 border--danger"
            }`}
          />

          <p className="text-sm text--danger text-center min-h-8">{errors?.email?.message}</p>
        </div>

        {/* COUNTRY */}
        <div className="flex-1 w-full max-w-[500px] mx-auto">
          <Controller
            control={control}
            name="countryId"
            render={({ field: { onChange, value } }) => (
              <CountryCombobox
                onChange={onChange}
                value={value}
                countries={countries}
                error={errors?.countryId?.message}
              />
            )}
          />

          <p className="text-sm text--danger text-center min-h-8">{errors?.countryId?.message}</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="col-auto w-30 flex bg-black text-white justify-center py-2.5 rounded-xl items-center hover:bg-slate-900 disabled:bg-[#ededed] disabled:text-[#a3a3a3] cursor-pointer disabled:cursor-not-allowed font-semibold text-sm"
        >
          {isSubmitting ? "Loading..." : "Submit Vote"}
        </button>
      </form>
    </div>
  )
}

export default AddVoteForm
