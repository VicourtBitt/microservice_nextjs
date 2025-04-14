"use client"

import MainProvider from "@/context";
import DefaultOutlet from "@/layout/default/DefaultOutlet";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Roboto:wght@400;500;700&family=Montserrat:wght@400;500;700&family=Poppins:wght@400;500;700&family=Merriweather:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body>
        <MainProvider>
          <DefaultOutlet>
            {children}
          </DefaultOutlet>
        </MainProvider>
      </body>
    </html>
  );
}
