import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FormProvider } from "@/contexts/form-context";
import type React from "react"; // Added import for React

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conference Ticket Generator",
  description: "Generate your conference ticket",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <FormProvider>
          <div className="main-container h-full w-full pt-6 ">
            <nav className="px-4 backdrop-blur-[2px]">
              <div className="container px-4 py-3 flex items-center justify-between border border-[#197686] rounded-[24px] w-full max-w-[1200px] mx-auto my-0 ">
                <div className="flex items-center space-x-4">
                  <img src="/logo.png" alt="logo" />
                </div>

                <div className="lg:flex items-center hidden  space-x-6">
                  <a href="#" className="text-gray-300 hover:text-white">
                    Events
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    My Tickets
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    About Project
                  </a>
                </div>

                <button className="bg-white text-black px-4 py-3 lg:px-6 lg:py-4 rounded-[12px] hover:bg-gray-100">
                  MY TICKETS →
                </button>
              </div>
            </nav>
            <main className="container mx-auto px-4 py-4">{children}</main>
          </div>
        </FormProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import Image from "next/image";
