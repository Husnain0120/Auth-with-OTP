import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata = {
  title: "otp_auth",
  description: "____",
};
export default function RootLayout({ children }) {
  return (
    <html lang="ur">
      <body>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
