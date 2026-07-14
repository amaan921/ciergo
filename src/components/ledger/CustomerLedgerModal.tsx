import { useState, useEffect, useCallback } from 'react'
import { Modal } from '@/components/common/Modal'
import { Button } from '@/components/common/buttons/Button'
import { LedgerSummaryBar } from './LedgerSummaryBar'
import { LedgerTable } from './LedgerTable'
import { DatePicker } from '@/components/common/DatePicker'
import { Dropdown } from '@/components/common/Dropdown'
import type { LedgerFilters, LedgerSummary as LedgerSummaryType, LedgerEntry } from '@/types'
import {
  getLedgerEntries,
  getLedgerSummary,
  getTotalReceived,
  getTotalPaid,
} from '@/services/ledgerService'
import { formatCurrency } from '@/utils'
import {
  Eye,
  Edit,
  ChevronDown,
  FileText,
  Download,
  Share2,
} from 'lucide-react'

interface CustomerLedgerModalProps {
  isOpen: boolean
  onClose: () => void
  customerId: string
  onViewPdf: () => void
  onShare: () => void
}

export function CustomerLedgerModal({
  isOpen,
  onClose,
  customerId,
  onViewPdf,
  onShare,
}: CustomerLedgerModalProps) {
  const [entries, setEntries] = useState<LedgerEntry[]>([])
  const [summary, setSummary] = useState<LedgerSummaryType | null>(null)
  const [entityName, setEntityName] = useState('')
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<LedgerFilters>({
    pendingInvoiceOnly: false,
  })

  const fetchData = useCallback(async () => {
    if (!customerId) return
    setLoading(true)
    try {
      const [ledgerResult, summaryResult] = await Promise.all([
        getLedgerEntries(customerId, 'customer', filters),
        getLedgerSummary(customerId, 'customer'),
      ])
      setEntries(ledgerResult.entries)
      setEntityName(ledgerResult.entityName)
      setSummary(summaryResult)
    } finally {
      setLoading(false)
    }
  }, [customerId, filters])

  useEffect(() => {
    if (isOpen) {
      fetchData()
    }
  }, [isOpen, fetchData])

  const totalReceived = getTotalReceived(customerId, 'customer')
  const totalPaid = getTotalPaid(customerId, 'customer')

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={`Ledger | ${entityName} | ${customerId}`}
      headerActions={
        <div className="flex items-center gap-1">
          <button className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors">
            <Eye className="h-4 w-4" />
          </button>
          <button className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors">
            <Edit className="h-4 w-4" />
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-4 p-6">
        {/* Summary */}
        {summary && (
          <LedgerSummaryBar
            summary={summary}
            onRefresh={fetchData}
            loading={loading}
          />
        )}

        {/* Filters row */}
        <div className="flex flex-wrap items-end gap-3">
          <DatePicker
            label="Booking Date"
            value={filters.bookingDateFrom ?? ''}
            onChange={(e) =>
              setFilters({ ...filters, bookingDateFrom: e.target.value || undefined })
            }
            containerClassName="w-[140px]"
          />
          <DatePicker
            label="Travel Date"
            value={filters.travelDateFrom ?? ''}
            onChange={(e) =>
              setFilters({ ...filters, travelDateFrom: e.target.value || undefined })
            }
            containerClassName="w-[140px]"
          />

          {/* Pending Invoice toggle */}
          <label className="flex items-center gap-2 pb-1 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.pendingInvoiceOnly}
              onChange={(e) =>
                setFilters({ ...filters, pendingInvoiceOnly: e.target.checked })
              }
              className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-xs text-neutral-600">Pending Invoices Only</span>
          </label>

          {/* View PDF dropdown */}
          <div className="ml-auto">
            <Dropdown
              trigger={
                <Button variant="outline" size="sm" rightIcon={<ChevronDown className="h-3.5 w-3.5" />}>
                  <FileText className="h-4 w-4" />
                  View PDF
                </Button>
              }
              items={[
                {
                  label: 'View PDF',
                  icon: <FileText className="h-4 w-4" />,
                  onClick: onViewPdf,
                },
                {
                  label: 'Download',
                  icon: <Download className="h-4 w-4" />,
                  onClick: () => {},
                },
                {
                  label: 'Share',
                  icon: <Share2 className="h-4 w-4" />,
                  onClick: onShare,
                },
              ]}
              align="right"
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <LedgerTable data={entries} ledgerType="customer" loading={loading} />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 border-t border-neutral-200 px-6 py-4">
        <Button variant="success" size="sm">
          You Got: {formatCurrency(totalReceived)}
        </Button>
        <Button variant="danger" size="sm">
          You Gave: {formatCurrency(totalPaid)}
        </Button>
      </div>
    </Modal>
  )
}
