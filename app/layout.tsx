import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog | Anas Ahmed",
  keywords: ['blog', 'assignment', 'GIAIC'],
  description: "Blog 8th assignment from GIAIC completed by Anas Ahmed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <nav className="flex items-center justify-between px-5 sm:px-10 py-5 borer-b">
            <Link className="text-2xl font-bold" href={'/'}>Anas</Link>
            <li className="flex text-lg font-medium items-center gap-3">
              <Link href={'/https://anas3d.netlify.app'} target="_blank">About</Link>
              <Link href={'/contact'}>Contact</Link>
              <Link href={'/#blogs'} >Blogs</Link>
            </li>
          </nav>
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
