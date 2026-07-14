import { useState, useCallback, useEffect } from 'react'
import type { LedgerEntry, LedgerFilters, LedgerSummary, LedgerType } from '@/types'
import {
  getLedgerEntries,
  getLedgerSummary,
  getTotalReceived,
  getTotalPaid,
} from '@/services/ledgerService'

interface UseLedgerOptions {
  entityId: string
  entityType: LedgerType
  enabled: boolean
}

export function useLedger({ entityId, entityType, enabled }: UseLedgerOptions) {
  const [entries, setEntries] = useState<LedgerEntry[]>([])
  const [summary, setSummary] = useState<LedgerSummary | null>(null)
  const [entityName, setEntityName] = useState('')
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<LedgerFilters>({
    pendingInvoiceOnly: false,
  })

  const fetchData = useCallback(async () => {
    if (!entityId || !enabled) return
    setLoading(true)
    try {
      const [ledgerResult, summaryResult] = await Promise.all([
        getLedgerEntries(entityId, entityType, filters),
        getLedgerSummary(entityId, entityType),
      ])
      setEntries(ledgerResult.entries)
      setEntityName(ledgerResult.entityName)
      setSummary(summaryResult)
    } finally {
      setLoading(false)
    }
  }, [entityId, entityType, filters, enabled])

  useEffect(() => {
    if (enabled) {
      fetchData()
    }
  }, [enabled, fetchData])

  const totalReceived = enabled ? getTotalReceived(entityId, entityType) : 0
  const totalPaid = enabled ? getTotalPaid(entityId, entityType) : 0

  return {
    entries,
    summary,
    entityName,
    loading,
    filters,
    setFilters,
    totalReceived,
    totalPaid,
    refresh: fetchData,
  }
}
