import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider 
          theme={{
            primaryColor: "dark",
          }}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}