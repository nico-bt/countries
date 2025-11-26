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
}: {
  onChange: (value: string) => void
  countries: Country[]
  value: string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? countries.find((country) => country.id === +value)?.name : "Select country..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
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
