import '@styles/globals.css'
import { Inter } from 'next/font/google'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Corona - DevRev',
  description: 'By Gokul',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
        <Nav/>
        {children}
        </Provider>
      </body>
    </html>
  )
}
