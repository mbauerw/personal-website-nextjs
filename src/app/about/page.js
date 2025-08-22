'use client'
import dynamic from 'next/dynamic'
import ClientLayout from '../../components/ClientLayout'

const About = dynamic(() => import('../pages/About'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default function AboutPage() {
  return (
    <ClientLayout>
      <About />
    </ClientLayout>
  )
}