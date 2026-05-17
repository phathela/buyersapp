import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "BuyersApp - Find the best deals. Save money. Buy smarter.",
  description:
    "A deal marketplace connecting buyers with businesses. Access exclusive deals, earn rewards, and make smarter purchases.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
