'use client'
import { createContext, useContext } from 'react'

const LayoutContext = createContext()

export const useLayoutContext = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider')
  }
  return context
}

export default LayoutContext