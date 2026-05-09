export type JobStatus = 'applied' | 'interview' | 'offer' | 'rejected' | 'saved'

export interface Job {
  id?: number
  company: string
  role: string
  location?: string
  job_url?: string
  date_applied: string
  status: JobStatus
  notes?: string
  cover_letter_used: boolean
  cover_letter_text?: string
  cv_id?: number
  created_at: string
}

export interface CV {
  id?: number
  label: string
  file_name: string
  file_data: ArrayBuffer
  file_type: string
  is_general: boolean
  created_at: string
}

export interface Stats {
  applied: number
  interview: number
  offer: number
  rejected: number
  saved: number
  total: number
}

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
}

export type ImportMode = 'replace' | 'merge'
