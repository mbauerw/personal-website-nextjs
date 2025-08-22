'use client'
import dynamic from 'next/dynamic'
import ClientLayout from '../../components/ClientLayout'

const Music = dynamic(() => import('../../pages/Music'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default function MusicPage() {
  return (
    <ClientLayout>
      <Music />
    </ClientLayout>
  )
}