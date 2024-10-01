import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import './globals.css';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
      <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
      
        <MantineProvider 
          theme={{
            primaryColor: "dark",
          }}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}