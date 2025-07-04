"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider, theme } from "antd";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "魔方学习",
//   description: "学习魔方速拧和盲拧",
// };
export default function RootLayout({ children }) {
  const { token } = theme.useToken();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <ConfigProvider
            theme={{
              algorithm: theme.darkAlgorithm,
            }}
          >
            <App
              className="h-full"
              style={{
                backgroundColor: token.colorTextBase,
              }}
            >
              {children}
            </App>
          </ConfigProvider>
        </AntdRegistry>
        {process.env.NODE_ENV === 'development' && process.env.PINY_VISUAL_SELECT === 'true' && (
          <Script
            src="/_piny/piny.phone.js"
            strategy="beforeInteractive"
          />)} { /* <-- conditionally include the Piny script */}
      </body>
    </html>
  );
}
