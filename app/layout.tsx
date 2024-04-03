import './globals.css'
import { Inter } from 'next/font/google'
import { StoreProvider } from './StoreProvider'

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Notes of Solace',
  description: 'A sleek and simple notes app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </StoreProvider>
  )
}
