'use client'
import dynamic from 'next/dynamic'
import ClientLayout from '../../components/ClientLayout'

const GdpPop = dynamic(() => import('../pages/GdpPop'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default function GdpPage() {
  return (
    <ClientLayout>
      <GdpPop />
    </ClientLayout>
  )
}

