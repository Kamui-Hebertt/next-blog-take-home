import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { FooterLinks } from '@/components/Footer/Footer';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   

   <html lang="en">
     <body className={inter.className}>
     <MantineProvider>
      {children}
      <FooterLinks />
      </MantineProvider>
      </body>
   </html>

  )
}
