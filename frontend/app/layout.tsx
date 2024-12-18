import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ads Inspect",
  description: "See the ads your competitors are using online"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
      <html lang="en">
        <head>
          <script defer src="https://cdn.overtracking.com/t/tllnMQkfn3WqCweca/"></script>
        </head>
        <body className={inter.className}>
          {children}
        </body>
      </html>
  );
}
