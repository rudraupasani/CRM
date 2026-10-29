'use client'

import { useState, useEffect, useCallback } from 'react'
import type { RecordItem } from '@/types/crm'
import { seedRecords } from '@/data/seed-records'

const STORAGE_KEY = 'morfex.tech-records'

export function useCrmRecords() {
  const [records, setRecords] = useState<RecordItem[]>(seedRecords)
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRecords(parsed)
        }
      }
    } catch (e) {
      console.error('Failed to load CRM records from localStorage:', e)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Persist to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
      } catch (e) {
        console.error('Failed to save CRM records to localStorage:', e)
      }
    }
  }, [records, isLoaded])

  const addRecord = useCallback((newRecord: RecordItem) => {
    setRecords((prev) => [newRecord, ...prev])
  }, [])

  const addRecords = useCallback((newRecords: RecordItem[]) => {
    setRecords((prev) => [...newRecords, ...prev])
  }, [])

  const updateRecord = useCallback((updated: RecordItem) => {
    setRecords((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
  }, [])

  const deleteRecord = useCallback((id: string) => {
    setRecords((prev) => prev.filter((item) => item.id !== id))
  }, [])

  return {
    records,
    addRecord,
    addRecords,
    updateRecord,
    deleteRecord,
    isLoaded,
  }
}
