"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Country } from "@/app/generated/prisma"

export function CountryCombobox({
  onChange,
  countries,
  value,
  error,
}: {
  onChange: (value: string) => void
  countries: Country[]
  value: string
  error?: string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
          onChange(value || "") // forces validation when the popover closes
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={"w-full justify-between h-full" + (error ? " border-2 border--danger" : "")}
          style={
            value ? { color: "black", fontWeight: 500 } : { color: "#8A8C90", fontWeight: "normal" }
          }
        >
          {value ? countries.find((country) => country.id === +value)?.name : "Country"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search country..." className="h-9" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.id}
                  value={country.name}
                  onSelect={(currentValue) => {
                    // Find the country by name and pass its id (as string) to the form handler
                    const selected = countries.find((c) => c.name === currentValue)
                    if (selected) {
                      onChange(selected.id.toString())
                    }
                    setOpen(false)
                  }}
                >
                  {country.name}
                  <Check
                    className={cn("ml-auto", +value === country.id ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
