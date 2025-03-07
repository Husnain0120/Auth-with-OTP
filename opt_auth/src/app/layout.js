import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata = {
  title: "otp",
  description: "____",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Toaster position="top-right" richColors />
      <body>{children}</body>
    </html>
  );
}
