import type { Job, CV, ImportMode } from '../types'

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes.buffer
}

export async function exportToJSON(
  getJobs: () => Promise<Job[]>,
  getCVs: () => Promise<CV[]>
): Promise<void> {
  const jobs = await getJobs()
  const cvs = await getCVs()

  const payload = {
    exported_at: new Date().toISOString(),
    jobs,
    cvs: cvs.map((cv) => ({
      ...cv,
      file_data: cv.file_data ? arrayBufferToBase64(cv.file_data) : null,
    })),
  }

  const json = JSON.stringify(payload, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const date = new Date().toISOString().split('T')[0]
  const a = document.createElement('a')
  a.href = url
  a.download = `tyj-backup-${date}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

interface ImportPayload {
  jobs: Omit<Job, 'id'>[]
  cvs: Omit<CV, 'id'>[]
}

function isValidPayload(obj: unknown): obj is ImportPayload {
  if (typeof obj !== 'object' || obj === null) return false
  const p = obj as Record<string, unknown>
  return Array.isArray(p.jobs) && Array.isArray(p.cvs)
}

export async function importFromJSON(
  file: File,
  mode: ImportMode,
  dbFns: {
    addJob: (d: Omit<Job, 'id'>) => Promise<number>
    addCV: (d: Omit<CV, 'id'>) => Promise<number>
    getAllJobs: () => Promise<Job[]>
    getAllCVs: () => Promise<CV[]>
    deleteJob: (id: number) => Promise<void>
    deleteCV: (id: number) => Promise<void>
  }
): Promise<{ jobsImported: number; cvsImported: number }> {
  const text = await file.text()
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    throw new Error('Invalid JSON file')
  }

  if (!isValidPayload(parsed)) {
    throw new Error('Invalid backup format: expected { jobs: [...], cvs: [...] }')
  }

  const { jobs, cvs } = parsed

  if (mode === 'replace') {
    const existingJobs = await dbFns.getAllJobs()
    const existingCVs = await dbFns.getAllCVs()
    await Promise.all(existingJobs.map((j) => j.id !== undefined && dbFns.deleteJob(j.id)))
    await Promise.all(existingCVs.map((c) => c.id !== undefined && dbFns.deleteCV(c.id)))
  }

  let jobsImported = 0
  let cvsImported = 0

  const existingJobs = mode === 'merge' ? await dbFns.getAllJobs() : []
  const existingCVs = mode === 'merge' ? await dbFns.getAllCVs() : []

  for (const cv of cvs) {
    const restored: Omit<CV, 'id'> = {
      ...cv,
      file_data: cv.file_data ? base64ToArrayBuffer(cv.file_data as unknown as string) : new ArrayBuffer(0),
    } as unknown as Omit<CV, 'id'>

    if (mode === 'merge') {
      const dup = existingCVs.find((e) => e.label === restored.label)
      if (dup) continue
    }

    await dbFns.addCV(restored)
    cvsImported++
  }

  for (const job of jobs) {
    const restored = job as unknown as Omit<Job, 'id'>

    if (mode === 'merge') {
      const dup = existingJobs.find((e) => e.company === restored.company && e.role === restored.role)
      if (dup) continue
    }

    await dbFns.addJob(restored)
    jobsImported++
  }

  return { jobsImported, cvsImported }
}
