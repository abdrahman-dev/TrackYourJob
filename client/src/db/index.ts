import { openDB } from 'idb'
import type { Job, CV, Stats } from '../types'

const DB_NAME = 'tyj-db'
const DB_VERSION = 1

let _dbPromise: ReturnType<typeof openDB> | null = null

function db(): ReturnType<typeof openDB> {
  if (!_dbPromise) {
    _dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('jobs')) {
          db.createObjectStore('jobs', { keyPath: 'id', autoIncrement: true })
        }
        if (!db.objectStoreNames.contains('cvs')) {
          db.createObjectStore('cvs', { keyPath: 'id', autoIncrement: true })
        }
      },
    })
  }
  return _dbPromise
}

export async function initDB(): Promise<void> {
  await db()
}

export async function getAllJobs(): Promise<Job[]> {
  return (await db()).getAll('jobs')
}

export async function getJob(id: number): Promise<Job | undefined> {
  return (await db()).get('jobs', id)
}

export async function addJob(data: Omit<Job, 'id'>): Promise<number> {
  return (await db()).add('jobs', data) as Promise<number>
}

export async function updateJob(id: number, data: Partial<Job>): Promise<void> {
  const store = await db()
  const existing = await store.get('jobs', id)
  if (existing) {
    await store.put('jobs', { ...existing, ...data })
  }
}

export async function deleteJob(id: number): Promise<void> {
  await (await db()).delete('jobs', id)
}

export async function getAllCVs(): Promise<CV[]> {
  return (await db()).getAll('cvs')
}

export async function getCV(id: number): Promise<CV | undefined> {
  return (await db()).get('cvs', id)
}

export async function addCV(data: Omit<CV, 'id'>): Promise<number> {
  return (await db()).add('cvs', data) as Promise<number>
}

export async function deleteCV(id: number): Promise<void> {
  await (await db()).delete('cvs', id)
}

export async function getStats(): Promise<Stats> {
  const jobs = await getAllJobs()
  const stats: Stats = {
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
    saved: 0,
    total: jobs.length,
  }
  for (const job of jobs) {
    if (job.status === 'applied') stats.applied++
    else if (job.status === 'interview') stats.interview++
    else if (job.status === 'offer') stats.offer++
    else if (job.status === 'rejected') stats.rejected++
    else if (job.status === 'saved') stats.saved++
  }
  return stats
}

export async function getJobsUsingCV(cvId: number): Promise<Job[]> {
  const jobs = await getAllJobs()
  return jobs.filter((j) => j.cv_id === cvId)
}
