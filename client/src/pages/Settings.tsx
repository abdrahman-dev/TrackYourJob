import { useState } from 'react'
import { useToast } from '../hooks/useToast'
import { exportToJSON, importFromJSON } from '../utils/importExport'
import { getAllJobs, getAllCVs, addJob, addCV, deleteJob, deleteCV } from '../db'
import type { ImportMode } from '../types'

export function Settings() {
  const { showToast } = useToast()
  const [importFile, setImportFile] = useState<File | null>(null)
  const [importing, setImporting] = useState(false)

  const handleExport = async () => {
    try {
      await exportToJSON(getAllJobs, getAllCVs)
      showToast('Data exported successfully', 'success')
    } catch (e) {
      console.error('Export failed', e)
      showToast('Failed to export data', 'error')
    }
  }

  const handleImport = async (mode: ImportMode) => {
    if (!importFile) return
    setImporting(true)
    try {
      const result = await importFromJSON(importFile, mode, {
        addJob,
        addCV,
        getAllJobs,
        getAllCVs,
        deleteJob,
        deleteCV,
      })
      showToast(`Imported ${result.jobsImported} jobs, ${result.cvsImported} CVs`, 'success')
      setImportFile(null)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Import failed'
      showToast(msg, 'error')
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="settings-page">
      <div className="settings-section">
        <div className="settings-section-title">EXPORT DATA</div>
        <div className="settings-desc">
          Download all your job applications and CVs as a JSON backup file.
        </div>
        <button className="settings-btn primary" onClick={handleExport}>
          EXPORT ALL DATA AS JSON
        </button>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">IMPORT DATA</div>
        <div className="settings-desc">
          Import a previously exported backup file. Choose whether to replace all existing data or merge.
        </div>

        <input
          type="file"
          accept=".json"
          onChange={(e) => setImportFile(e.target.files?.[0] ?? null)}
        />

        {importFile && (
          <>
            <div className="settings-file-name">Selected: {importFile.name}</div>
            <div className="settings-import-actions">
              <button
                className="settings-btn danger"
                onClick={() => handleImport('replace')}
                disabled={importing}
              >
                {importing ? 'IMPORTING...' : 'REPLACE ALL DATA'}
              </button>
              <button
                className="settings-btn surface"
                onClick={() => handleImport('merge')}
                disabled={importing}
              >
                MERGE DATA
              </button>
            </div>
          </>
        )}
      </div>

      <div className="settings-section">
        <div className="settings-section-title">BACKUP FORMAT</div>
        <div className="settings-info">{`{
  "exported_at": "2026-05-09T...",
  "jobs": [ ...job objects ],
  "cvs": [ ...cv objects, file_data as base64 ]
}`}</div>
      </div>
    </div>
  )
}
