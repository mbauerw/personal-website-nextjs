'use client'
import dynamic from 'next/dynamic'
import ClientLayout from '../../components/ClientLayout'

const Contact = dynamic(() => import('../pages/Contact'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default function ContactPage() {
  return (
    <ClientLayout>
      <Contact />
    </ClientLayout>
  )
}