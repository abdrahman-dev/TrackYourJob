import { useState, useEffect, useCallback } from 'react'
import * as api from '../api/cvs'
import type { CV } from '../types'

export function useCVs() {
  const [cvs, setCvs] = useState<CV[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.fetchCVs()
      setCvs(data)
    } catch (e) {
      console.error('Failed to fetch CVs', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    api.fetchCVs().then((data) => {
      if (!cancelled) {
        setCvs(data)
        setLoading(false)
      }
    }).catch((e) => {
      console.error('Failed to fetch CVs', e)
      if (!cancelled) setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  return { cvs, loading, refresh }
}
