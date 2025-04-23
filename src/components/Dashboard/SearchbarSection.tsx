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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import usePatientsStore from "@/store/patients"

export default function SearchbarSection() {
  const [open, setOpen] = useState(false);
  const {selectedPatientsName, patientsNameList, setPatientsName} = usePatientsStore()
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedPatientsName
            ? patientsNameList.find((patients) => patients.value === selectedPatientsName)?.label
            : "Select patients..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-white">
        <Command>
          <CommandInput placeholder="Search patients..." />
          <CommandList>
            <CommandEmpty>No name found.</CommandEmpty>
            <CommandGroup>
              {patientsNameList.map((patients) => (
                <CommandItem
                  key={patients.value}
                  value={patients.value}
                  onSelect={(currentValue) => {
                    setPatientsName(currentValue === selectedPatientsName ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {patients.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedPatientsName === patients.value ? "opacity-100" : "opacity-0"
                    )}
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
