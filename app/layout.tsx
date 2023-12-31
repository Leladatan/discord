import './globals.css';
import type { Metadata } from 'next';
import {Open_Sans} from 'next/font/google';
import {NextFont} from "next/dist/compiled/@next/font";
import { ClerkProvider } from '@clerk/nextjs';
import ThemesProvider from "@/providers/theme-provider";
import {cn} from "@/lib/utils";
import { dark } from '@clerk/themes';
import ModalProvider from "@/providers/modal-provider";
import {SocketProvider} from "@/providers/socket-provider";
import QueryProvider from "@/providers/query-provider";

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
    <ClerkProvider
        appearance={{baseTheme: dark}}
    >
        <html lang="en">
        <ThemesProvider>
            <SocketProvider>
              <body className={cn("transition-colors bg-white dark:bg-neutral-700 overflow-hidden overflow-y-auto scrollbar-thin", nextFont.className)}>
              <ModalProvider />
              <QueryProvider>
                {children}
              </QueryProvider>
              </body>
            </SocketProvider>
        </ThemesProvider>
        </html>
    </ClerkProvider>
  );
};
