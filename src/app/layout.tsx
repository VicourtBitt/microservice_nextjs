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
        <title>MDAN</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
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
