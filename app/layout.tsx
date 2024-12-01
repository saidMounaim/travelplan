import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Travelplan",
  description:
    "A modern travel planner using Next.js 15, TailwindCSS, Prisma, and Clerk",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={`${roboto.className} antialiased`}>
          {children}
          <Toaster
            toastOptions={{
              classNames: {
                error: "bg-red-500",
                info: "bg-blue-400",
                success: "bg-green-400",
                warning: "bg-orange-400",
                toast: "bg-blue-400",
                title: "text-white",
                description: "text-white",
                actionButton: "bg-zinc-400",
                cancelButton: "bg-orange-400",
                closeButton: "bg-lime-400",
                icon: "text-white",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
