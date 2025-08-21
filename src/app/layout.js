import './globals.css'

export const metadata = {
  title: 'Max Bauer',
  description: 'Welcome. Stuff to check out.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}