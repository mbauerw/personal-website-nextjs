'use client'
import dynamic from 'next/dynamic'
import ClientLayout from '../../components/ClientLayout'

const Portfolio = dynamic(() => import('../pages/Portfolio'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default function PortfolioPage() {
  return (
    <ClientLayout>
      <Portfolio />
    </ClientLayout>
  )
}
