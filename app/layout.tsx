import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Administrador de servicios",
  description: "Administrador de servicios de transporte",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primaryColor-foreground p-5`}>
        <h1 className="text-2xl p-5 text-center font-semibold">Administrador de servicios</h1>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
