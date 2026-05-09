import { useState, useEffect, useCallback } from 'react'
import * as api from '../api/jobs'
import type { Job } from '../types'

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.fetchJobs()
      setJobs(data)
    } catch (e) {
      console.error('Failed to fetch jobs', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    api.fetchJobs().then((data) => {
      if (!cancelled) {
        setJobs(data)
        setLoading(false)
      }
    }).catch((e) => {
      console.error('Failed to fetch jobs', e)
      if (!cancelled) setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  return { jobs, loading, refresh }
}

export function useJob(id: number) {
  const [job, setJob] = useState<Job | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    api.fetchJob(id).then((data) => {
      if (!cancelled) {
        setJob(data)
        setLoading(false)
      }
    }).catch((e) => {
      console.error('Failed to fetch job', e)
      if (!cancelled) setLoading(false)
    })
    return () => { cancelled = true }
  }, [id])

  return { job, loading }
}
