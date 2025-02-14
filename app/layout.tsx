import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { FormProvider } from "@/contexts/form-context"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Conference Ticket Generator",
  description: "Generate your conference ticket",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <FormProvider>
          <div className="main-container h-full">
            <nav className="border-b border-teal-900/20">
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-white">tiez</span>
                </div>
                <div className="flex items-center space-x-6">
                  <a href="#" className="text-gray-300 hover:text-white">
                    Events
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    My Tickets
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    About Project
                  </a>
                  <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-100">
                    MY TICKETS →
                  </button>
                </div>
              </div>
            </nav>
            <main className="container mx-auto px-4 py-4">{children}</main>
          </div>
        </FormProvider>
      </body>
    </html>
  );
}



import './globals.css'