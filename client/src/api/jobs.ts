import * as db from '../db'
import type { Job } from '../types'

export const fetchJobs = (): Promise<Job[]> => db.getAllJobs()
export const createJob = (data: Omit<Job, 'id'>): Promise<number> => db.addJob(data)
export const updateJobById = (id: number, data: Partial<Job>): Promise<void> => db.updateJob(id, data)
export const removeJob = (id: number): Promise<void> => db.deleteJob(id)
export const fetchJob = (id: number): Promise<Job | undefined> => db.getJob(id)
