'use client'
import dynamic from 'next/dynamic'
import ClientLayout from '../../components/ClientLayout'

const Footer = dynamic(() => import('../../pages/Footer'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default function FooterPage() {
  return (
    <ClientLayout>
      <Footer />
    </ClientLayout>
  )
}