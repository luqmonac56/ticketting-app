"use client"

import { useForm } from "@/contexts/form-context"
import { TicketSelection } from "@/components/ticket-selection"
import { AttendeeDetails } from "@/components/attendee-details"
import { TicketConfirmation } from "@/components/ticket-confirmation"

export default function Home() {
  const { formData } = useForm()

  return (
    <div className="flex items-center justify-center h-full">
      {formData.step === 1 && <TicketSelection />}
      {formData.step === 2 && <AttendeeDetails />}
      {formData.step === 3 && <TicketConfirmation />}
    </div>
  )
}

