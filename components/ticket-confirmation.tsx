"use client";

import { useForm } from "@/contexts/form-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EVENT_DETAILS } from "@/constants";
import { MapPin } from "lucide-react";

export function TicketConfirmation() {
  const { formData, resetForm } = useForm();

  const handleDownload = () => {
    console.log("Downloading ticket...");
  };

  return (
    <div className="w-[700px] p-12 mx-auto h-full bg-[#041E23] border border-[#0E464F] rounded-[40px]">
      <div className="mb-1 w-full flex justify-between items-center">
        <h1 className="text-3xl font-serif text-white">Ready</h1>
        <span className="text-gray-400 text-sm">Step 3/3</span>
      </div>
      <div className="h-1 w-full mb-8 bg-teal-500"></div>

      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          Your Ticket is Booked!
        </h2>
        <p className="text-gray-300">
          Check your email for a copy or you can
          <button
            onClick={handleDownload}
            className="font-semibold hover:underline"
          >
            download
          </button>
        </p>
      </div>

      <Card className="border-2 border-[#24A0B5] bg-[rgba(3,30,33,0.1)] rounded-[16px] p-6 w-[400px] m-auto">
        <div className="border-2 border-[#24A0B5] bg-[rgba(3,30,33,0.1)] backdrop-blur-[2px] rounded-[12px] p-5">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-white mb-4 font-serif">
              {EVENT_DETAILS.name}
            </h3>
            <div className="flex text-[10px] items-center justify-center text-gray-300 space-x-2">
              <MapPin className="w-4 h-4 text-teal-500" />
              <span>{EVENT_DETAILS.location}</span>
            </div>
            <div className="text-gray-300 text-[10px] mt-1">
              {EVENT_DETAILS.date} | {EVENT_DETAILS.time}
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <img
              src={formData.avatarUrl || "/placeholder.svg"}
              alt="Profile"
              className=" w-36 h-36 rounded-[12px] border-4 border-[#24a0b580]"
            />
          </div>

          <div className=" text-white p-2 rounded-[12px] border-[#133D44] bg-[#08343C]">
            <div className="grid grid-cols-2 gap-4 border-b border-[#12464E]">
              <div className="border-r border-[#12464E]">
                <p className="text-[10px] text-[#ffffff54]">Enter your name</p>
                <p className="font-bold text-[10px]">{formData.fullName}</p>
              </div>
              <div className="">
                <p className="text-[10px] text-[#ffffff54]">
                  Enter your email *
                </p>
                <p className="font-bold text-[10px] text-wrap">
                  {formData.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-[#12464E] ">
              <div className=" border-r border-[#12464E]">
                <p className="text-[10px] text-[#ffffff54]">Ticket Type:</p>
                <p className="font-bold text-[10px]">{formData.ticketType}</p>
              </div>

              <div className="">
                <p className="text-[10px] text-[#ffffff54]">Ticket for:</p>
                <p className="font-bold text-[10px]">{formData.quantity}</p>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[10px] text-[#ffffff54]">Special request?</p>
              <p className="text-[10px]">
                Nii? Or the users' sad story they write in there gets this whole
                space, Max of three rows
              </p>
            </div>
          </div>
        </div>
      </Card>
      <div className="flex gap-6 w-full justify-between pt-4">
        <Button
          variant="outline"
          className="border-[#24A0B5] rounded-[8px] text-[#24A0B5] hover:bg-teal-900/20 flex-1"
          onClick={resetForm}
        >
          Book Another Ticket
        </Button>
        <Button
          className="bg-[#24A0B5] rounded-[8px] hover:bg-teal-600 flex-1 text-white"
          onClick={handleDownload}
        >
          Download Ticket
        </Button>
      </div>
    </div>
  );
}
