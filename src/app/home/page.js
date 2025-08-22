'use client'
import dynamic from 'next/dynamic'
import ClientLayout from '../../components/ClientLayout'

const Home = dynamic(() => import('../pages/Home'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default function HomePage() {
  return (
    <ClientLayout>
      <Home />
    </ClientLayout>
  )
}