import * as db from '../db'
import type { CV } from '../types'

export const fetchCVs = (): Promise<CV[]> => db.getAllCVs()
export const createCV = (data: Omit<CV, 'id'>): Promise<number> => db.addCV(data)
export const removeCV = (id: number): Promise<void> => db.deleteCV(id)
export const fetchCV = (id: number): Promise<CV | undefined> => db.getCV(id)
