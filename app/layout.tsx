import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import Header from "@/components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className="flex flex-col min-h-screen">
          <MantineProvider
            theme={{
              primaryColor: "dark",
            }}
          >
            <Header />
            <main className="flex-grow">
              {children}
            </main>
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}