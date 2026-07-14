import { Drawer } from '@/components/common/Drawer'
import { Button } from '@/components/common/buttons/Button'
import { Download, Share2 } from 'lucide-react'
import { formatCurrency, formatDate } from '@/utils'

interface PdfPreviewDrawerProps {
  isOpen: boolean
  onClose: () => void
  entityName: string
  entityId: string
  entityType: 'customer' | 'vendor'
  onDownload: () => void
  onShare: () => void
}

export function PdfPreviewDrawer({
  isOpen,
  onClose,
  entityName,
  entityId,
  entityType,
  onDownload,
  onShare,
}: PdfPreviewDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Ledger PDF — ${entityName}`}
      width="max-w-4xl"
      headerActions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onDownload}
            leftIcon={<Download className="h-4 w-4" />}
          >
            Download
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onShare}
            leftIcon={<Share2 className="h-4 w-4" />}
          >
            Share
          </Button>
        </div>
      }
    >
      <div className="p-8">
        {/* Mock PDF Content */}
        <div className="mx-auto max-w-2xl space-y-8">
          {/* Header */}
          <div className="border-b border-neutral-200 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">
                  Ciergo Finance
                </h1>
                <p className="text-sm text-neutral-500 mt-1">
                  {entityType === 'customer' ? 'Customer' : 'Vendor'} Ledger Statement
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-neutral-700">
                  Statement Date
                </p>
                <p className="text-sm text-neutral-500">
                  {formatDate(new Date().toISOString())}
                </p>
              </div>
            </div>
          </div>

          {/* Entity info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium uppercase text-neutral-400 mb-1">
                {entityType === 'customer' ? 'Customer' : 'Vendor'} Name
              </p>
              <p className="text-sm font-semibold text-neutral-800">
                {entityName}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-neutral-400 mb-1">
                {entityType === 'customer' ? 'Customer' : 'Vendor'} ID
              </p>
              <p className="text-sm font-semibold text-neutral-800">
                {entityId}
              </p>
            </div>
          </div>

          {/* Mock ledger entries */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-700 mb-3">
              Ledger Entries
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-left">
                  <th className="py-2 text-xs font-medium text-neutral-500">Date</th>
                  <th className="py-2 text-xs font-medium text-neutral-500">Description</th>
                  <th className="py-2 text-xs font-medium text-neutral-500 text-right">Debit</th>
                  <th className="py-2 text-xs font-medium text-neutral-500 text-right">Credit</th>
                  <th className="py-2 text-xs font-medium text-neutral-500 text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }, (_, i) => {
                  const isDebit = i % 3 !== 0
                  const amount = (i + 1) * 5000
                  const balance = isDebit ? amount : -amount
                  return (
                    <tr key={i} className="border-b border-neutral-100">
                      <td className="py-2 text-neutral-600">
                        {formatDate(`2025-${String(i + 1).padStart(2, '0')}-15`)}
                      </td>
                      <td className="py-2 text-neutral-700">
                        {isDebit ? 'Booking Created' : 'Payment Received'}
                      </td>
                      <td className="py-2 text-right text-danger-600">
                        {isDebit ? formatCurrency(amount) : '—'}
                      </td>
                      <td className="py-2 text-right text-success-600">
                        {!isDebit ? formatCurrency(amount) : '—'}
                      </td>
                      <td className="py-2 text-right font-medium text-neutral-800">
                        {formatCurrency(balance)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="rounded-lg bg-neutral-50 border border-neutral-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-600">
                Total Outstanding
              </span>
              <span className="text-lg font-bold text-danger-600">
                {formatCurrency(45000)}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-neutral-200 pt-4 text-center">
            <p className="text-xs text-neutral-400">
              This is a computer-generated statement. No signature required.
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              Generated by Ciergo Finance on {formatDate(new Date().toISOString())}
            </p>
          </div>
        </div>
      </div>
    </Drawer>
  )
}
