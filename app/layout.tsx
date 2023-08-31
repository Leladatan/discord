import './globals.css';
import type { Metadata } from 'next';
import {Open_Sans} from 'next/font/google';
import {NextFont} from "next/dist/compiled/@next/font";
import { ClerkProvider } from '@clerk/nextjs';
import ThemesProvider from "@/providers/theme-provider";
import {cn} from "@/lib/utils";

const nextFont: NextFont = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Discord',
  description: 'Discord app description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
        <html lang="en">
        <ThemesProvider>
            <body className={cn("transition-colors", nextFont.className)}>
            {children}
            </body>
        </ThemesProvider>
        </html>
    </ClerkProvider>
  );
};
