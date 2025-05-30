import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Sidebar } from "@/components/sideBar";
import { ToastContainer } from "react-toastify";
import Providers from "@/providers/reactquery";
import { ChatwootWidget } from "@/components/chatwoot";
import CurrectUSerProvider from "@/providers/currectUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clerk Next.js Quickstart",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
          >
            <CurrectUSerProvider>
              <div className="flex flex-col min-w-full md:flex-row min-h-screen">
                <Sidebar />
                {children}
                <ChatwootWidget />
              </div>
            </CurrectUSerProvider>
          </body>
        </html>
        <Toaster />
        <ToastContainer />
      </Providers>
    </ClerkProvider>
  );
}
